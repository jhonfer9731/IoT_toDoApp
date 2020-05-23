<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MisLista extends Model
{
    public function user(){
        return $this->belongsTo('App\User');
    }

    public function todos(){
        return $this->hasMany('App\Todo');
    }

}
