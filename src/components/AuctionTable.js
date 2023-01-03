import { Button, Col, DatePicker, InputNumber, Row, Select } from "antd";
import React, { useState } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
const dayjs = require("dayjs");
const dateFormat = "YYYY/MM/DD";

const { Option } = Select;

const AuctionTable = () => {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(false);
  const currentDate = dayjs().format("YYYY/MM/DD");
  console.log(currentDate);

  const onChange = (value, data, key) => {
    const date = dayjs(value.$d).format("YYYY/MM/DD");
    updateValue(date, data, key);
  };

  const checkValue = (data) => {
    if (
      data.quantity > 0 &&
      data.min_quantity > 0 &&
      data.bids > 0 &&
      data.start_date !== "" &&
      data.durationType !== "" &&
      data.duration > 0 &&
      data.reserve > 0 &&
      data.buy_now > 0
    )
      return true;
    else return false;
  };

  const changeStatus = () => {
    let tempState = true;
    tableData.forEach((data) => {
      if (checkValue(data)) {
        data.edit = false;
        data.status = true;
      } else {
        data.edit = true;
        tempState = false;
      }
    });
    return tempState;
  };

  const deleteRow = (id) => {
    tableData.splice(id, 1);
    setTableData([...tableData]);
  };

  const edit = (id) => {
    tableData.forEach((data, index) => {
      if (index === id) {
        data.edit = true;
      }
    });
    setTableData([...tableData]);
  };
  const exitEdit = () => {
    if (changeStatus()) {
      tableData.forEach((data, index) => {
        data.edit = false;
      });
      setTableData([...tableData]);
    }
  };

  const checkEditStatus = () => {
    let status = true;
    tableData.forEach((data, index) => {
      if (data.edit === true) {
        status = false;
      }
    });
    return status;
  };

  const updateValue = (value, data, key) => {
    setError(false);
    switch (key) {
      case (key = "quantity"):
        data.quantity = value;
        break;
      case (key = "min_quantity"):
        data.min_quantity = value;
        break;
      case (key = "bids"):
        data.bids = value;
        break;
      case (key = "reserve"):
        data.reserve = value;
        break;
      case (key = "buy_now"):
        data.buy_now = value;
        break;
      case (key = "duration"):
        data.duration = value;
        break;
      case (key = "durationType"):
        data.durationType = value;
        break;
      default:
        data.start_date = value;
    }
  };
  const addRow = () => {
    const newRow = {
      quantity: 1,
      min_quantity: 1,
      bids: 1,
      start_date: currentDate,
      duration: 1,
      durationType: "Hour",
      reserve: 1,
      buy_now: 1,
      edit: true,
      status: false,
    };
    if (tableData.length === 0) {
      setTableData([...tableData, newRow]);
    } else if (changeStatus()) {
      setTableData([...tableData, newRow]);
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <div className="border rounded-md mt-[10%] h-[310px] overflow-y-scroll">
        {/* Table Header */}
        <Row className="border-b  w-[1500px]">
          <Col
            span={3}
            className="font-semibold bg-gray-100 h-12 flex items-center justify-center border-gray-300 border-r"
          >
            Quantity
          </Col>
          <Col
            span={3}
            className="font-semibold flex items-center justify-center bg-gray-100 border-gray-300 border-r"
          >
            Min Quantity
          </Col>
          <Col
            span={3}
            className="font-semibold flex items-center justify-center bg-gray-100 border-gray-300 border-r"
          >
            Bids Received
          </Col>
          <Col
            span={3}
            className="font-semibold flex items-center justify-center bg-gray-100 border-gray-300 border-r"
          >
            Start Date
          </Col>
          <Col
            span={3}
            className="font-semibold flex items-center justify-center bg-gray-100 border-gray-300 border-r"
          >
            Duration
          </Col>
          <Col
            span={3}
            className="font-semibold flex items-center justify-center bg-gray-100 border-gray-300 border-r"
          >
            Reserve
          </Col>
          <Col
            span={3}
            className="font-semibold flex items-center justify-center bg-gray-100 border-gray-300 border-r"
          >
            Buy Now
          </Col>
          <Col
            span={3}
            className="font-semibold flex items-center justify-center bg-gray-100"
          ></Col>
        </Row>

        {/* Tble Body */}
        {tableData.map((data, index) => {
          return (
            <Row key={index} className=" border-b w-[1500px]">
              <Col
                span={3}
                className="flex justify-center items-center h-12 border-r"
              >
                {data.edit ? (
                  <InputNumber
                    style={{
                      width: "50%",
                    }}
                    defaultValue={data.quantity}
                    className={data.quantity < 1 && "border-red-600"}
                    onChange={(e) => updateValue(e, data, "quantity")}
                  />
                ) : (
                  <div
                    className="w-full h-full flex justify-center items-center"
                    onClick={exitEdit}
                  >
                    {data.quantity}
                  </div>
                )}
              </Col>
              <Col
                span={3}
                className="flex justify-center items-center h-12 border-r"
              >
                {data.edit ? (
                  <InputNumber
                    style={{
                      width: "50%",
                    }}
                    defaultValue={data.min_quantity}
                    className={data.min_quantity < 1 && "border-red-600"}
                    onChange={(e) => updateValue(e, data, "min_quantity")}
                  />
                ) : (
                  <div
                    className="w-full h-full flex justify-center items-center"
                    onClick={exitEdit}
                  >
                    {data.min_quantity}
                  </div>
                )}
              </Col>
              <Col
                span={3}
                className="flex justify-center items-center h-12 border-r"
              >
                {data.edit ? (
                  <InputNumber
                    style={{
                      width: "50%",
                    }}
                    defaultValue={data.bids}
                    className={data.bids < 1 && "border-red-600"}
                    onChange={(e) => updateValue(e, data, "bids")}
                  />
                ) : (
                  <div
                    className="w-full h-full flex justify-center items-center"
                    onClick={exitEdit}
                  >
                    {data.bids}
                  </div>
                )}
              </Col>
              <Col
                span={3}
                className="flex justify-center items-center h-12 border-r"
              >
                {data.edit ? (
                  <DatePicker
                    defaultValue={dayjs(currentDate, dateFormat)}
                    format={dateFormat}
                    onChange={(e) => onChange(e, data, "start_date")}
                  />
                ) : (
                  <div
                    className="w-full h-full flex justify-center items-center"
                    onClick={exitEdit}
                  >
                    {data.start_date}
                  </div>
                )}
              </Col>
              <Col
                span={3}
                className="flex justify-center items-center h-12 border-r"
              >
                {data.edit ? (
                  <>
                    <InputNumber
                      style={{
                        width: "40%",
                        borderTopRightRadius: "0",
                        borderBottomRightRadius: "0",
                        borderRight: "0 white solid",
                      }}
                      defaultValue={data.duration}
                      className={data.duration < 1 && "border-red-600"}
                      onChange={(e) => updateValue(e, data, "duration")}
                    />
                    <Select
                      defaultValue={data.durationType}
                      onChange={(e) => updateValue(e, data, "durationType")}
                      style={{
                        width: 75,
                      }}
                    >
                      <Option value="Hour">Hour</Option>
                      <Option value="Day">Day</Option>
                    </Select>
                  </>
                ) : (
                  <div
                    className="w-full h-full flex justify-center items-center"
                    onClick={exitEdit}
                  >
                    {data.duration + " " + data.durationType}
                  </div>
                )}
              </Col>
              <Col
                span={3}
                className="flex justify-center items-center h-12 border-r"
              >
                {data.edit ? (
                  <InputNumber
                    style={{
                      width: "50%",
                    }}
                    defaultValue={data.reserve}
                    className={data.reserve < 1 && "border-red-600"}
                    onChange={(e) => updateValue(e, data, "reserve")}
                  />
                ) : (
                  <div
                    className="w-full h-full flex justify-center items-center"
                    onClick={exitEdit}
                  >
                    {data.reserve}
                  </div>
                )}
              </Col>
              <Col
                span={3}
                className="flex justify-center items-center h-12 border-r"
              >
                {data.edit ? (
                  <InputNumber
                    style={{
                      width: "50%",
                    }}
                    defaultValue={data.buy_now}
                    className={data.buy_now < 1 && "border-red-600"}
                    onChange={(e) => updateValue(e, data, "buy_now")}
                  />
                ) : (
                  <div
                    className="w-full h-full flex justify-center items-center"
                    onClick={exitEdit}
                  >
                    {data.buy_now}
                  </div>
                )}
              </Col>
              <Col
                span={3}
                className=" flex justify-center items-center space-x-3 "
              >
                {
                  <Button
                    disabled={!checkEditStatus()}
                    className="cursor-pointer flex items-center"
                    type="link"
                    shape="circle"
                    onClick={() => edit(index)}
                  >
                    <EditOutlined className="text-lg " />
                  </Button>
                }

                <Button
                  className="cursor-pointer flex items-center"
                  type="link"
                  shape="circle"
                  onClick={() => deleteRow(index)}
                >
                  <DeleteOutlined className="text-lg" />
                </Button>
              </Col>
            </Row>
          );
        })}
      </div>
      <Row>
        <Col span={24}>
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            className="w-full mt-2"
            onClick={addRow}
          >
            Add new auction
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default AuctionTable;
