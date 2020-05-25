<?php

namespace App\Http\Controllers;

use App\User;
use App\MisLista;   
use Illuminate\Http\Request;

class MisListasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $userLoggedId = auth()->user()->id;
        $listas = User::find($userLoggedId)->mislistas;
        
        return view('listas.index')->with('listas',$listas);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request,[
            'nombre' => 'string||required',
            'comentario' => 'nullable'
        ]);
        $userLoggedId = auth()->user()->id;

        $lista = new MisLista();
        $lista->nombre = $request->nombre;
        $lista->Comentario = $request->comentario;
        $lista->user_id = $userLoggedId;
        $lista->save();
        return redirect('/listas');       

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
        if(!$lista = MisLista::find($id)){
            return redirect()->back()->withErrors("no existe esa lista");
        }
        
        return view('listas.listaShow')->with('lista',$lista);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
