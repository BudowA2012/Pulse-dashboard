use serde::Serialize;
use sysinfo::Disks;


// Dane jednego dysku
#[derive(Serialize)]
pub struct DiskInfo {

    pub name: String,

    pub mount: String,

    pub total_space: u64,

}





#[tauri::command]
pub fn get_disks() -> Vec<DiskInfo> {


    let disks = Disks::new_with_refreshed_list();



    let mut result: Vec<DiskInfo> = Vec::new();



    for disk in disks.list() {


        result.push(
            DiskInfo {

                name:
                    disk.name()
                    .to_string_lossy()
                    .to_string(),


                mount:
                    disk.mount_point()
                    .to_string_lossy()
                    .to_string(),


                total_space:
                    disk.total_space(),

            }
        );


    }



    result

}