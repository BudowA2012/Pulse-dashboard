use nvml_wrapper::Nvml;
use nvml_wrapper::enum_wrappers::device::{
    TemperatureSensor,
    Clock,
};


#[tauri::command]
pub fn get_gpu_usage() -> f32 {

    let nvml = match Nvml::init() {

        Ok(v) => v,

        Err(_) => return 0.0,

    };


    let gpu = match nvml.device_by_index(0) {

        Ok(v) => v,

        Err(_) => return 0.0,

    };


    match gpu.utilization_rates() {

        Ok(data) => data.gpu as f32,

        Err(_) => 0.0,

    }

}





#[derive(serde::Serialize)]
pub struct GpuInfo {

    pub name: String,

    pub usage: f32,

    pub temperature: u32,

    pub memory_used: u64,

    pub memory_total: u64,

    pub graphics_clock: u32,

    pub memory_clock: u32,

    pub power_usage: u32,

    pub power_limit: u32,

}





#[tauri::command]
pub fn get_gpu_info() -> GpuInfo {


    let nvml = match Nvml::init() {

        Ok(v) => v,

        Err(_) => {

            return GpuInfo {

                name: "Unknown GPU".into(),

                usage: 0.0,

                temperature: 0,

                memory_used: 0,

                memory_total: 0,

                graphics_clock: 0,

                memory_clock: 0,

                power_usage: 0,

                power_limit: 0,

            }

        }

    };




    let gpu = match nvml.device_by_index(0) {

        Ok(v) => v,

        Err(_) => {

            return GpuInfo {

                name: "Unknown GPU".into(),

                usage: 0.0,

                temperature: 0,

                memory_used: 0,

                memory_total: 0,

                graphics_clock: 0,

                memory_clock: 0,

                power_usage: 0,

                power_limit: 0,

            }

        }

    };





    let name = gpu
        .name()
        .unwrap_or_else(|_| "Unknown GPU".into());





    let usage = gpu
        .utilization_rates()
        .map(|u| u.gpu as f32)
        .unwrap_or(0.0);





    let temperature = gpu
        .temperature(TemperatureSensor::Gpu)
        .unwrap_or(0);





    let memory = gpu
        .memory_info()
        .ok();





    let graphics_clock = gpu
        .clock_info(Clock::Graphics)
        .unwrap_or(0);





    let memory_clock = gpu
        .clock_info(Clock::Memory)
        .unwrap_or(0);





    let power_usage = gpu
        .power_usage()
        .map(|v| v / 1000)
        .unwrap_or(0);





    let power_limit = gpu
        .power_management_limit()
        .map(|v| v / 1000)
        .unwrap_or(0);





    GpuInfo {

        name,

        usage,

        temperature,

        memory_used: memory
            .as_ref()
            .map(|m| m.used)
            .unwrap_or(0),


        memory_total: memory
            .as_ref()
            .map(|m| m.total)
            .unwrap_or(0),


        graphics_clock,


        memory_clock,


        power_usage,


        power_limit,

    }

}