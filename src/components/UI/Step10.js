// TopBottom-Screws
// - 8x TopBottom Screws coming from Top/Side, Arrow
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { isInbetween, isOne, isZero, lerp } from "../../lib/helperfunctions";
import { scrollStore } from "../../store/store";
import { ArrowRound } from "../Arrows/ArrowRound";
import { ScrewsSide } from "../Screws/ScrewsSide";
import { ScrewTop } from "../Screws/ScrewsTop";

// 8x TopScrews
function Step10Animations() {
  const [showScrews, setShowScrews] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [position, setPosition] = useState(0);
  const [rotation, setRotation] = useState(0.15);

  const { sf10 } = scrollStore();
  useLayoutEffect(() => {
    const sf1InterpolatedRotation = lerp(0, Math.PI * 6, sf10);

    const sf1InterpolatedPosition = lerp(-0.2, 0.076, sf10);

    if (isInbetween(sf10)) {
      setShowScrews(true);
      setRotation(sf1InterpolatedRotation);
      setPosition(sf1InterpolatedPosition);
    } else if (isZero(sf10)) {
      setShowScrews(false);
      setShowArrow(true);
    } else if (isOne(sf10)) {
      setShowArrow(false);
    }
  }, [sf10]);

  return { showScrews, showArrow, position, rotation };
}

export function ScrewsTop() {
  const arrow1 = useRef(null);
  const ref = useRef(null);
  const { position, rotation, showScrews, showArrow } = Step10Animations();

  useEffect(() => {
    arrow1.current.visible = showArrow;

    if (!showScrews) return;
    arrow1.current.rotation.y = rotation;
    ref.current.position.z = position;
  }, [arrow1, showArrow, position, rotation, showScrews]);

  return (
    <group
      dispose={null}
      ref={ref}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, -0.2]}
    >
      <ScrewTop />
      <ArrowRound position={[0.1845, 0.05, 0.369]} ref={arrow1} />;
    </group>
  );
}

function ScrewsBottom() {
  const ref = useRef(null);
  const { showScrews, position } = Step10Animations();

  useEffect(() => {
    if (!showScrews) return;
    ref.current.position.y = position;
  }, [showScrews, position]);

  return (
    <group
      dispose={null}
      position={[0.393, -0.0075, 0.0008]}
      ref={ref}
      rotation={[0, 0, 0]}
      visible={showScrews}
    >
      <ScrewsSide />
      <ScrewsSide position={[0.344, 0, 0]} />
    </group>
  );
}

function Step10Components() {
  return { ScrewsTop };
}

export { Step10Components };
