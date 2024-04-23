import { useSelector } from "react-redux";
import io from "socket.io-client";

// const SOCKET_URL = "ws://appsdemo.pro:3007";  // Use http instead of https, and specify port 3000 //Live URL
const SOCKET_URL = "ws://appsdemo.pro:3010";  // Use http instead of https, and specify port 3000 //LOCAL URL

class WSService {
    initiaize = async () => {

        try {
            this.socket = io(SOCKET_URL, {
                transports: ['websocket']
            })
            console.log("is connecting?", this.socket.connected)
            this.socket.on("connect", () => {
                // this.socket.emit("userDetails", userDetails);
                console.log("===== socket connected ====");
            });

            this.socket.on("disconnect", (data) => {
                console.log("===== socket disconnected ====")
            })

            this.socket.on("error", (data) => {
                console.log("===== socket error ====")
            })

            // console.log("intializing socket", this.socket)

        } catch (error) {
            console.log("socket is not connected", error)

        }
    }


    // emit(login, data = {}) {
    //     console.log('Emitting event:', data); // Add this line for debugging
    //     this.socket.emit(login, data);
    // }

    emit(event, data = {}) {
        console.log('Emitting event:', event); // Add this line for debugging
        this.socket.emit(event, data);
    }


    on(event, cb) {
        this.socket.on(event, cb)
    }
    removeListener(event, cb) {
        this.socket.off(event, cb);
    }
}

const socketServices = new WSService()

export default socketServices