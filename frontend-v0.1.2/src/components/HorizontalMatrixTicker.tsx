
import React, { useEffect, useRef, useState } from "react";

const MATRIX_CHARS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

const getRandomChar = () => {
  const index = Math.floor(Math.random() * MATRIX_CHARS.length);
  return MATRIX_CHARS[index];
};

const generateString = (length: number) => {
  return Array.from({ length }, () => getRandomChar()).join("");
};

interface HorizontalMatrixTickerProps {
  length?: number;
  speed?: number;
  className?: string;
}

export const HorizontalMatrixTicker: React.FC<HorizontalMatrixTickerProps> = ({ 
  length = 8, 
  speed = 180,
  className = ""
}) => {
  const [ticker, setTicker] = useState(generateString(length));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTicker((prev) => {
        const nextChar = getRandomChar();
        const updated = prev.slice(1) + nextChar;
        return updated;
      });
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [speed]);

  return (
    <span className={`font-mono tracking-wider ${className}`}>
      {ticker}
    </span>
  );
};
