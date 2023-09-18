<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public $status;
    public $message;
    public $resource;
    public $code;

    public function __construct($status, $message, $resource, $code = 200)
    {
        parent::__construct($resource);
        $this->status = $status;
        $this->message = $message;
        $this->code = $code;
    }
    
    public function toArray(Request $request)
    {
        return new Response([
            "status" => $this->status,
            "message" => $this->message,
            "data" => $this->resource
        ], $this->code);
    }
}
