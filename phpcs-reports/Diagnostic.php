<?php

namespace VSCode\PHP_CodeSniffer\Reports;

use VSCode\PHP_CodeSniffer\VSCodeFile;

// @phpcs:disable
require_once __DIR__ . DIRECTORY_SEPARATOR . 'includes' . DIRECTORY_SEPARATOR . 'VSCodeReport.php';
// @phpcs:enable

/**
 * A custom report for returning information from PHPCS in a way that the
 * extension can more easily consume.
 */
class Diagnostic extends VSCodeReport
{
    /**
     * Executes the actual PHPCS report.
     *
     * @param array $report The PHPCS report.
     * @param VSCodeFile $file The file we're reporting on.
     * @param stdClass|null $data The data object passed from VS Code.
     * @return bool True if we have processed the file, otherwise false.
     */
    protected function executeReport($report, VSCodeFile $file, $data)
    {
        $diagnostics = array();
        $codeActions = array();

        $diagnosticIndex = 0;
        foreach ($report['messages'] as $line => $columns) {
            foreach ($columns as $column => $messages) {
                $stackPtr = $file->getStackPtrForPosition($line, $column);
                $token = $file->getToken($stackPtr);

                foreach ($messages as $message) {
                    // When fixable create a code action object according to the VS Code CodeAction schema.
                    if ($message['fixable']) {
                        $codeAction = array(
                            'title' => 'Fix ' . $message['source'],
                            'kind' => 'quickfix',
                            // The index can be used to associate the code action in VS Code.
                            'diagnostic' => $diagnosticIndex
                        );
                        $codeActions[] = $codeAction;
                    }

                    // Create a diagnostic object according to the VS Code Diagnostic schema.
                    $diagnostic = array(
                        'code' => $message['source'],
                        'message' => $message['message'],
                        'range' => $token['vscode_range'],
                        // Enum Values: DiagnosticSeverity.Error : DiagnosticSeverity.Warning
                        'severity' => strtolower($message['type']) === 'error' ? 0 : 1,
                        'source' => 'PHP_CodeSniffer',
                    );
                    $diagnostics[$diagnosticIndex++] = $diagnostic;
                }
            }
        }

        echo json_encode(
            array(
                'filename' => $report['filename'],
                'diagnostics' => $diagnostics,
                'codeActions' => $codeActions
            ),
            JSON_UNESCAPED_LINE_TERMINATORS
        );
        // Ensure multiple files are separated by a comma.
        echo ',';

        return true;
    }
}
