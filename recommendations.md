## Disallow Weak Hash
Jangan gunakan hash MD5 atau SHA1 (***mudah di-crack!***), terutama terkait password.

## Detect Weak Validation
Contoh validasi yang lemah:
```php
$this->validate($request, [
    'name' => 'required',
    'username' => 'required',
    'email' => 'required',
    'password' => 'required',
    'gambar' => 'required',
]);
```

Contoh validasi input yang lebih aman/baik:
```php
$this->validate($request, [
     'name' => 'required|string|max:255',
     'username' => 'required|string|max:20|unique:users',
     'email' => 'required|string|email|max:255|unique:users',
     'password' => 'required|string|min:8|confirmed',
     // atau lebih ketat lagi
        'password' => [
                'required',
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
                    ->uncompromised()
            ],
            'password_confirmation' => 'required|same:password'
     'gambar' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
 ]);
```
## Detect Upload File/Image Process
Sebaiknya ada proses rename file, batasi ukuran file, batasi extensi yang boleh di-upload.

## Disallow Raw SQL Query
Dalam dokumentasi Laravel, dinyatakan bahwa penggunaan syntax raw SQL adalah tidak aman. Silakan baca di https://laravel.com/docs/10.x/queries#raw-expressions

## Detect Read-only
Logika read-only di blade untuk mematikan suatu fungsi/link/button akan bisa dihack dengan inspect element. Letakkan bagian logic di controller, bukan di blade.

## Detect Logic in Blade File
Letakkan bagian logic di controller, bukan di blade.

## Detect Un-encrypted ID in Blade File
Contoh pemanggilan ID yang polos/kurang rahasia di file blade:
```php
<a class="dropdown-item" href="{{route('anggota.edit', $data->id)}}"> Edit </a>
```

Cara yang lebih baik:
```php
<a class="dropdown-item" href="{{route('anggota.edit', Crypt::encrypt($data->id))}}"> Edit </a>
```

Contoh pemrosesan ID (polos) di controller: 
```php
public function edit($id)
{   
  if((Auth::user()->level == 'user') && (Auth::user()->id != $id)) {
    Alert::info('Oopss..', 'Anda dilarang masuk ke area ini.');
    return redirect()->to('/');
}
$data = Anggota::findOrFail($id);
```

Cara yang lebih baik (jika di blade, anda melakukan enkripsi ID):
```php
public function edit($id)
{   
  <b>$id = Crypt::decrypt($id);</b>
  if((Auth::user()->level == 'user') && (Auth::user()->id != $id)) {
    Alert::info('Oopss..', 'Anda dilarang masuk ke area ini.');
    return redirect()->to('/');
}
$data = Anggota::findOrFail($id);
```

## Disallow Un-escaped Syntax</a>
Gunakan ```{{ ... }}``` daripada ```{!! ... !!}```
