import React, {useState, useEffect} from "react";
import '../../App.css';
import {Chart as ChartJS} from 'chart.js/auto'
import {Line} from "react-chartjs-2";

function Logs() {

    const [dataList, setDataList] = useState([]);
    const [yList, setYList] = useState([]);
    const [uList, setUList] = useState([]);
    const [tsList, setTsList] = useState([]);
    const [tsMqttList, setTsMqttList] = useState([]);
    const [stateList, setStateList] = useState([]);

    const callApiFS = async () => {
        fetch("http://localhost:9000/getlogs/", {
            method: "get",
            dataType: 'json',
        })
            .then((res) => res.json())
            .then((data) => {

                var tempDataList = [];
                var tempYList = [];
                var tempUList = [];
                var tempTsList = [];
                var tempTsMqttList = [];
                var tempStateList = [];

                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    tempDataList.push(item);
                    tempYList.push(item.y);
                    tempUList.push(item.u);
                    tempTsList.push(item.timestamp.value.toString());
                    tempTsMqttList.push(item.timestamp_mqtt.value.toString());
                    tempStateList.push(item.state);
                }

                setDataList(tempDataList);
                setYList(tempYList);
                setUList(tempUList);
                setTsList(tempTsList);
                setTsMqttList(tempTsMqttList);
                setStateList(tempStateList);

            })

    }

    useEffect(() => {
        callApiFS();
    }, []);

    const Table = () => (
        <table className={"tabular"}>
            <tbody>
            <tr>
                <th>Timestamp</th>
                {tsList?.map(value =>
                    <td>{value}</td>
                )}
            </tr>
            <tr>
                <th>Timestamp MQTT</th>
                {tsMqttList?.map(value =>
                    <td>{value}</td>
                )}
            </tr>
            <tr>
                <th>Ball position</th>
                {yList?.map(value =>
                    <td>{value.toString()}</td>
                )}
            </tr>
            <tr>
                <th>Fan operating speed</th>
                {uList?.map(value =>
                    <td>{value.toString()}</td>
                )}
            </tr>
            </tbody>
        </table>
    )

    return (
        <div>

            <div className={"graph"}>
                <Line data={{
                    labels: tsList,
                    datasets: [
                        {
                            label: "ball position",
                            data: yList,
                            fill: true,
                            lineTension: 0.18,
                            backgroundColor: "rgba(75,192,192,0.2)",
                            borderColor: "rgba(75,192,192,1)"
                        }
                    ]
                }} type={"line"}/>
            </div>
            <br/><br/>
            <Table></Table>

        </div>

    );
}

export default Logs;
