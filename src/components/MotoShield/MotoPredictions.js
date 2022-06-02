import React, {useState, useEffect} from "react";
import '../../App.css';

function MotoPredictions() {

    const [tsList, setTsList] = useState([]);
    const [valList, setValList] = useState([]);

    const callApiMS = async () => {
        fetch("http://localhost:9000/getmotopredictions", {
            method: "get",
            dataType: 'json',
        })

            .then((res) => res.json())
            .then((data) => {
                var temptsList = [];
                var tempvalList = [];

                // nemusi fungovat
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    temptsList.push(item.timestamp.value.toString());
                    if (item.value_ === null) {
                        tempvalList.push("null");
                    } else {
                        tempvalList.push(item.value_?.toString());
                    }
                }

                setTsList(temptsList);
                setValList(tempvalList);

            })

    }

    useEffect(() => {
        callApiMS();
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
                <th>Values</th>
                {valList?.map(value =>
                    <td>{value}</td>
                )}
            </tr>
            </tbody>
        </table>
    )

    return (
        <div>
            <h5>predictions</h5>
            {/*<div className={"graph"}>*/}
            {/*    {tsList?.map(value =>*/}
            {/*        <p>{value}</p>)}*/}
            {/*</div>*/}
            {/*<div className={"graph"}>*/}
            {/*    {valList?.map(value =>*/}
            {/*        <p>{value}</p>)}*/}
            {/*</div>*/}

            <Table></Table>

        </div>

    );
}

export default MotoPredictions;
