import { FC, Fragment } from "react";

type ILoaderProps = {
  text?: string;
  display: boolean;
};

const Loader: FC<ILoaderProps> = ({ text, display }) => {
  const content: JSX.Element = Boolean(text) ? <div 
        className="flex text-xl font-bold flex-start text-brand-base">
            {text}
        </div>
        : <Fragment/>;
  if (display) {
    return (
        <div className="relative flex">
          {content}
          <svg
            style={{position: 'relative', top: '-10px', left: '5px'}}
            width={50}
            height={50}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200">
            <circle
              fill="#EE4D14"
              stroke="#EE4D14"
              strokeWidth="15"
              r="15"
              cx="40"
              cy="100"
            >
              <animate
                attributeName="opacity"
                calcMode="spline"
                dur="2"
                values="1;0;1;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.4"
              ></animate>
            </circle>
            <circle
              fill="#EE4D14"
              stroke="#EE4D14"
              strokeWidth="15"
              r="15"
              cx="100"
              cy="100"
            >
              <animate
                attributeName="opacity"
                calcMode="spline"
                dur="2"
                values="1;0;1;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.2"
              ></animate>
            </circle>
            <circle
              fill="#EE4D14"
              stroke="#EE4D14"
              strokeWidth="15"
              r="15"
              cx="160"
              cy="100"
            >
              <animate
                attributeName="opacity"
                calcMode="spline"
                dur="2"
                values="1;0;1;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="0"
              ></animate>
            </circle>
          </svg>
        </div>
      );
  } else {
    return <Fragment/>;
  }  
};

export default Loader;
