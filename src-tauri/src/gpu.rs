use nvml_wrapper::Nvml;

#[tauri::command]
pub fn get_gpu_usage() -> f32 {

    let nvml = match Nvml::init(){

        Ok(v)=>v,

        Err(_)=>return 0.0

    };



    let gpu = match nvml.device_by_index(0){

        Ok(v)=>v,

        Err(_)=>return 0.0

    };



    match gpu.utilization_rates(){

        Ok(data)=>
            data.gpu as f32,

        Err(_)=>
            0.0

    }

}