<?php 
namespace App\Repositories\Photo;

use App\Models\Photo;

class PhotoRepository implements PhotoRepositoryInterface
{
     public function update($path,$userId)
     {
          $photo = Photo::where("user_id",$userId)->firstOrFail();
          $photo->path = $path;
          $photo->save();
          return $photo;
     }
}