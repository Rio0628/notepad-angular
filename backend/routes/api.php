<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\NoteController;

Route::prefix('note')->group(function () {
    Router::get('/', [ NoteController::class, 'getAll']);
    Router::post('/', [ NoteController::class, 'create']);
    Router::delete('/{id}', [ NoteController::class, 'delete']);
    Router::get('/{id}', [ NoteController::class, 'get']);
    Router::put('/{id}', [ NoteController::class, 'update']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
