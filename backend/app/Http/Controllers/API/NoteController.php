<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Note;
use Log;

class NoteController extends Controller
{
    // https://carbon.now.sh/
    public function getAll() {
        $data = Note::get();
        return response()->json($data, 200);
    }
 
    public function create(Request $request) {
        $data['name'] = $request['name'];
        $data['note_body'] = $request['note_body'];
        Note::create($data);
        return response()->json([
            'message' => "Successfully Created",
            'success' => true
        ], 200);
    }

    public function delete($id) {
        $res = Note::find($id)->delete();
        return response()->json([
            'message' => "Successfully Deleted",
            "success" => true
        ], 200);
    }

    public function get($id) {
        $data = Note::find($id);
        return response()->json($data, 200);
    }

    public function update(Request $request, $id) {
        $data['name'] = $request['name'];
        $data['note_body'] = $request['note_body'];
        Note::find($id)->update($data);
        return response()->json([
            'message' => "Successfully Updated",
            'success' => true
        ], 200);
    }
}
