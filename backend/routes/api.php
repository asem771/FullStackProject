
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Health Check: verify that the Laravel API is running.
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'message' => 'Laravel API is running',
    ]);
});

// Authenticated user endpoint using Laravel Sanctum.
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
