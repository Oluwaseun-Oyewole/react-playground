import { Button as Buttons, ConfigProvider, notification } from "antd";

import { Button } from "../../atom/button";

interface NotiProps {
  permision: string;
}
export const Notification = ({ permision }: NotiProps) => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      message: `Status -- Permision Denied`,
      description: `${permision}`,
      duration: 20,
      style: {
        background: "lightgray",
        outline: "none",
        borderRadius: "5px",
      },
    });
  };

  return (
    <div className="my-2">
      {permision && (
        <>
          <ConfigProvider
            theme={{
              token: {
                fontFamily: "Quicksand",
              },
            }}
          >
            {contextHolder}
            <div className="w-[40%]">
              <Button
                children="Check Error Status"
                onClick={openNotification}
                className="bg-red-500 w-1/2"
              />
            </div>
          </ConfigProvider>
        </>
      )}
    </div>
  );
};
