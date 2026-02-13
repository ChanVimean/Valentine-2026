"use client";
import { useEffect } from "react";
import "../app/flower.scss";

export default function FlowerScene() {
  useEffect(() => {
    onload = () => {
      const c = setTimeout(() => {
        document.body.classList.remove("not-loaded");
        clearTimeout(c);
      }, 1000);
    };
  }, []);

  const delay = (d: string) => ({ "--d": d }) as React.CSSProperties;

  return (
    <div
      className={`flower-body not-loaded w-full h-full bg-black relative overflow-hidden`}
    >
      <div className="night"></div>
      <div className="flowers">
        {/* Flower 1 */}
        <div className="flower flower--1">
          <div className="flower__leafs flower__leafs--1">
            <div className="flower__leaf flower__leaf--1"></div>
            <div className="flower__leaf flower__leaf--2"></div>
            <div className="flower__leaf flower__leaf--3"></div>
            <div className="flower__leaf flower__leaf--4"></div>
            <div className="flower__white-circle"></div>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`flower__light flower__light--${i + 1}`}
              ></div>
            ))}
          </div>
          <div className="flower__line">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`flower__line__leaf flower__line__leaf--${i + 1}`}
              ></div>
            ))}
          </div>
        </div>

        {/* Flower 2 */}
        <div className="flower flower--2">
          <div className="flower__leafs flower__leafs--2">
            <div className="flower__leaf flower__leaf--1"></div>
            <div className="flower__leaf flower__leaf--2"></div>
            <div className="flower__leaf flower__leaf--3"></div>
            <div className="flower__leaf flower__leaf--4"></div>
            <div className="flower__white-circle"></div>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`flower__light flower__light--${i + 1}`}
              ></div>
            ))}
          </div>
          <div className="flower__line">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`flower__line__leaf flower__line__leaf--${i + 1}`}
              ></div>
            ))}
          </div>
        </div>

        {/* Flower 3 */}
        <div className="flower flower--3">
          <div className="flower__leafs flower__leafs--3">
            <div className="flower__leaf flower__leaf--1"></div>
            <div className="flower__leaf flower__leaf--2"></div>
            <div className="flower__leaf flower__leaf--3"></div>
            <div className="flower__leaf flower__leaf--4"></div>
            <div className="flower__white-circle"></div>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`flower__light flower__light--${i + 1}`}
              ></div>
            ))}
          </div>
          <div className="flower__line">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`flower__line__leaf flower__line__leaf--${i + 1}`}
              ></div>
            ))}
          </div>
        </div>

        {/* Scenery & Grass */}
        <div className="grow-ans" style={delay("1.2s")}>
          <div className="flower__g-long">
            <div className="flower__g-long__top"></div>
            <div className="flower__g-long__bottom"></div>
          </div>
        </div>

        <div className="growing-grass">
          <div className="flower__grass flower__grass--1">
            <div className="flower__grass--top"></div>
            <div className="flower__grass--bottom"></div>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`flower__grass__leaf flower__grass__leaf--${i + 1}`}
              ></div>
            ))}
            <div className="flower__grass__overlay"></div>
          </div>
        </div>

        <div className="growing-grass">
          <div className="flower__grass flower__grass--2">
            <div className="flower__grass--top"></div>
            <div className="flower__grass--bottom"></div>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`flower__grass__leaf flower__grass__leaf--${i + 1}`}
              ></div>
            ))}
            <div className="flower__grass__overlay"></div>
          </div>
        </div>

        {/* Additional Decorative Elements */}
        <div className="grow-ans" style={delay("2.4s")}>
          <div className="flower__g-right flower__g-right--1">
            <div className="leaf"></div>
          </div>
        </div>
        <div className="grow-ans" style={delay("2.8s")}>
          <div className="flower__g-right flower__g-right--2">
            <div className="leaf"></div>
          </div>
        </div>

        <div className="grow-ans" style={delay("2.8s")}>
          <div className="flower__g-front">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--${i + 1}`}
              >
                <div className="flower__g-front__leaf"></div>
              </div>
            ))}
            <div className="flower__g-front__line"></div>
          </div>
        </div>

        {/* Long Grass Groups */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((num) => (
          <div key={num} className={`long-g long-g--${num}`}>
            <div className="grow-ans" style={delay(`${3 + num * 0.2}s`)}>
              <div className="leaf leaf--0"></div>
            </div>
            <div className="grow-ans" style={delay(`${2.2 + num * 0.2}s`)}>
              <div className="leaf leaf--1"></div>
            </div>
            <div className="grow-ans" style={delay(`${3.4 + num * 0.2}s`)}>
              <div className="leaf leaf--2"></div>
            </div>
            <div className="grow-ans" style={delay(`${3.6 + num * 0.2}s`)}>
              <div className="leaf leaf--3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
