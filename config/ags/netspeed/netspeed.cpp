#include <fstream>
#include <iostream>
#include <unistd.h>
#include <nlohmann/json.hpp>


struct NetworkData {
    long long rx_bytes_prev;
    long long tx_bytes_prev;

    long long rx_bytes;
    long long tx_bytes;

    double rx_speed;
    double tx_speed;

    std::string interface;
    std::string unit;

    std::ostringstream rx_speed_str;
    std::ostringstream tx_speed_str;

    NetworkData() :
    rx_bytes_prev(0),
    tx_bytes_prev(0),

    rx_bytes(0),
    tx_bytes(0),

    rx_speed(0),
    tx_speed(0),

    interface(""),
    unit(""),

    rx_speed_str(""),
    tx_speed_str("") {}
};

void getInterfaces() {
    std::ifstream file("/proc/net/dev");
    std::string line;
    std::string interface;
    nlohmann::json json;

    std::getline(file, line);
    std::getline(file, line);

    while(std::getline(file, line)){
        std::istringstream iss(line);
        iss >> interface;
        json.push_back(interface);
    }
    std::cout << json.dump() << std::endl; 
    return;
}

void readData(NetworkData *data) {
    std::ifstream file("/proc/net/dev");
    std::string line;
    std::string iface;

    std::getline(file, line);
    std::getline(file, line);

    while (std::getline(file, line)) {

        std::istringstream iss(line);
        iss >> iface;

        if (iface == data->interface) {
            iss >> data->rx_bytes;
            
            for(int i = 0; i < 7;i++){
                iss.ignore();
            }
            iss >> data->tx_bytes;
            return;
        }
    }
    data->rx_bytes = 0;
    data->tx_bytes = 0;
    return;
}

int main(int argc, char * argv[]) {
    
    if(argc == 1) {
        getInterfaces();
        return 0;
    }

    NetworkData data;
    // Which interface?
    data.interface = argv[1];   

    nlohmann::json json_obj = {
        {"D", ""},
        {"U", ""}
    };

    while(true) {
        readData(&data);

        data.rx_speed = (data.rx_bytes - data.rx_bytes_prev)*8 / 1000;
        data.tx_speed = (data.tx_bytes - data.tx_bytes_prev)*8 / 1000;

        if(data.rx_speed > 999.0 || data.tx_speed > 999.0) {
            data.rx_speed /= 1000;
            data.tx_speed /= 1000;
            data.unit = "Mbit/s";
        }else {
            data.unit = "kbit/s";
        }

        data.rx_speed_str << std::fixed << std::setprecision(2) << data.rx_speed << " " << data.unit;
        data.tx_speed_str << std::fixed << std::setprecision(2) << data.tx_speed << " " << data.unit;

        json_obj["D"] = data.rx_speed_str.str();
        json_obj["U"] = data.tx_speed_str.str();

        std::cout << json_obj.dump() << std::endl;

        data.rx_bytes_prev = data.rx_bytes;
        data.tx_bytes_prev = data.tx_bytes;
        data.rx_speed_str.str("");
        data.tx_speed_str.str("");

        sleep(1);
    }
    return 0;
}