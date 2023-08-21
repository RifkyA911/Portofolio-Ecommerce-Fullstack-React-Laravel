<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public $status;
    public $message;
    public $resource;

    public function __construct($status, $message, $resource)
    {
        parent::__construct($resource);
        $this->$status;
        $this->$message;
    }
    
    public function toArray($request)
    {
        return [
            "status" => $this->status,
            "message" => $this->message,
            "data" => $this->resource
        ];
    }
}
