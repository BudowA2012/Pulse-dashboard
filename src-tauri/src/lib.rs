use sysinfo::System;
use nvml_wrapper::Nvml;


// ==========================
// CPU
// ==========================

#[tauri::command]
fn get_cpu_usage() -> f32 {

    let mut sys = System::new();

    sys.refresh_cpu();


    std::thread::sleep(
        std::time::Duration::from_millis(500)
    );


    sys.refresh_cpu();


    let cpus = sys.cpus();


    if cpus.is_empty() {
        return 0.0;
    }


    cpus
        .iter()
        .map(|cpu| cpu.cpu_usage())
        .sum::<f32>()
        /
        cpus.len() as f32

}



// ==========================
// RAM
// ==========================

#[tauri::command]
fn get_ram_usage() -> f32 {


    let mut sys = System::new();


    sys.refresh_memory();



    let total =
        sys.total_memory() as f32;



    let used =
        sys.used_memory() as f32;



    if total == 0.0 {
        return 0.0;
    }



    used / total * 100.0

}



// ==========================
// GPU
// ==========================

#[tauri::command]
fn get_gpu_usage() -> f32 {


    let nvml = match Nvml::init() {

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



// ==========================
// START
// ==========================


#[cfg_attr(mobile, tauri::mobile_entry_point)]

pub fn run(){


    tauri::Builder::default()


    .invoke_handler(

        tauri::generate_handler![

            get_cpu_usage,

            get_gpu_usage,

            get_ram_usage

        ]

    )


    .run(

        tauri::generate_context!()

    )


    .expect(
        "error while running tauri application"
    );

}