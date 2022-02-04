<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\NoteController;

Route::prefix('note')->group(function () {
    Route::get('/', [ NoteController::class, 'getAll']);
    Route::post('/', [ NoteController::class, 'create']);
    Route::delete('/{id}', [ NoteController::class, 'delete']);
    Route::get('/{id}', [ NoteController::class, 'get']);
    Route::put('/{id}', [ NoteController::class, 'update']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
