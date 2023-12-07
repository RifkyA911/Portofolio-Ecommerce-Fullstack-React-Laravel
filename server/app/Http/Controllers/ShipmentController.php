<?php

namespace App\Http\Controllers;

use App\Models\Shipment;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
use App\Models\Shipment_log;

class ShipmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (AuthController::check($request)==='admin') {
            $column2return = ['id','consignee','address','tracking_number','courier_service','cost','status'];
            return new PostResource(true, 'List Data Pengiriman', Shipment::with('ship_log:id,shipment_id,log,updated_at')->get($column2return));
        }
        return response(new PostResource(false, 'Access forbidden', null), 403)->header('Content-Lenght', strlen('Access forbidden'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function showByStatus(Request $request)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Shipment $shipment, Request $request, $status = null)
    {
        if (AuthController::check($request)) {
            if ($status == null) {
                return response(new PostResource(true, 'Data Pengiriman', $shipment->load('ship_log:id,shipment_id,log,updated_at')))->header('Content-Lenght', strlen(strval($shipment)));
            }
            $data = $shipment->where('status', 'LIKE', ucwords($status))->with('ship_log:id,shipment_id,log,updated_at')->get();
            return response(new PostResource(true, 'Data Pengiriman', $data))->header('Content-Lenght', strlen(strval($data)));
        }
        return response(new PostResource(false, 'Access forbidden', null), 403)->header('Content-Lenght', strlen('Access forbidden'));
    }
    
    /**
     * adding shipment_log by admin/system
     * for admin only(temporary)
     * parameter : token, shipment_id, log
     */
    public function addLog(Request $request) {
        if (AuthController::check($request) === 'admin') {
            $insertLog = Shipment_log::create($request->except('token'));
            return new PostResource(true, 'Berhasil menambahkan log', $insertLog);
        }
        return response(new PostResource(false, 'Access forbidden', null), 403)->header('Content-Lenght', strlen('Access forbidden'));
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Shipment $shipment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     * admin only| parameter : token|consignee, address, cintact, tracking_number, courier_service, cost, status
     */
    public function update(Request $request, Shipment $shipment)
    {
        if (AuthController::check($request) === 'admin') {
            if($updateShipment = $shipment->update($request->except('token'))){
                return new PostResource(true, 'Berhasil menambahkan log', $updateShipment);
            }
            return response(new PostResource(false, 'Update Failed', null), 400)->header('Content-Lenght', strlen('Update Failed'));
        } return response(new PostResource(false, 'Access forbidden', null), 403)->header('Content-Lenght', strlen('Access forbidden'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shipment $shipment)
    {
        //
    }
}
