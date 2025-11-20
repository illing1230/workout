import React from 'react';
import { View } from 'react-native';

// Simple gradient implementation for web
export default function LinearGradient({ colors, style, children, start, end }) {
  const gradientStyle = {
    background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
  };

  return (
    <View style={[style, gradientStyle]}>
      {children}
    </View>
  );
}
