import {
	CancellationError,
	CancellationToken,
	Range,
	TextDocument,
	TextEdit,
} from 'vscode';
import { FormatRequest, Request } from '../phpcs-report/request';
import { ReportType } from '../phpcs-report/response';
import { PHPCSError } from '../phpcs-report/worker';
import { WorkerService } from './worker-service';
import { ConfigurationError } from './configuration';

/**
 * A class for formatting documents and document ranges.
 */
export class DocumentFormatter extends WorkerService {
	/**
	 * Resolves a code action's edit property.
	 *
	 * @param {TextDocument} document The document we want to resolve the code action for.
	 * @param {CodeAction} codeAction The code action that we're going to resolve.
	 * @param {CancellationToken} [parentCancellationToken] The optional cancellation token to use.
	 */
	public format(
		document: TextDocument,
		range: Range | null,
		parentCancellationToken?: CancellationToken
	): Promise<TextEdit[]> {
		const cancellationToken = this.createCancellationToken(
			document,
			parentCancellationToken
		);
		if (!cancellationToken) {
			return Promise.resolve([]);
		}

		return this.configuration
			.get(document, cancellationToken)
			.then(() => {
				// Use a consistent key to prevent overlap when resolving the code action.
				const workerKey = ['format', document.fileName].join(':');

				return this.workerPool.waitForAvailable(
					workerKey,
					cancellationToken
				);
			})
			.then(async (worker) => {
				const workspaceUri =
					this.workspaceLocator.getWorkspaceFolderOrDefault(
						document.uri
					);
				const config = await this.configuration.get(document);

				const data: FormatRequest = {};

				if (range) {
					data.start = {
						line: range.start.line,
						character: range.start.character,
					};
					data.end = {
						line: range.end.line,
						character: range.end.character,
					};
				}

				// Use the worker to make a request for a format report.
				const request: Request<ReportType.Format> = {
					type: ReportType.Format,
					workingDirectory: workspaceUri.fsPath,
					documentPath: document.uri.fsPath,
					documentContent: document.getText(),
					options: {
						executable: config.executable,
						standard: config.standard,
					},
					data: data,
				};

				return worker.execute(request, cancellationToken);
			})
			.then((response) => {
				this.deleteCancellationToken(document);

				// Transform the content into a document-wide edit.
				const edits: TextEdit[] = [];
				if (response.report && response.report.content !== undefined) {
					edits.push(
						new TextEdit(
							new Range(0, 0, document.lineCount, 0),
							response.report.content
						)
					);
				}

				return edits;
			})
			.catch((e) => {
				// Cancellation errors are acceptable as they mean we've just repeated the update before it completed.
				if (e instanceof CancellationError) {
					return [];
				}

				// Configuration errors should be logged and presented to the user.
				if (e instanceof ConfigurationError) {
					this.logger.error(e);
					return [];
				}

				// We should send PHPCS errors to be logged and presented to the user.
				if (e instanceof PHPCSError) {
					this.logger.error(e);
					return [];
				}

				throw e;
			});
	}
}
