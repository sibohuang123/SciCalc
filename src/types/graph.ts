// Graph and plotting types

export type GraphType = '2d' | '3d' | 'parametric' | 'polar' | 'implicit';

export type FunctionType = 
  | 'polynomial' | 'trigonometric' | 'exponential' | 'logarithmic'
  | 'rational' | 'piecewise' | 'parametric' | 'polar';

export interface GraphFunction {
  id: string;
  name: string;
  expression: string;
  type: FunctionType;
  color: string;
  visible: boolean;
  domain?: [number, number];
  range?: [number, number];
  parameters?: Record<string, number>;
}

export interface Graph2DSettings {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  xStep: number;
  yStep: number;
  showGrid: boolean;
  showAxes: boolean;
  showLabels: boolean;
  gridColor: string;
  axesColor: string;
  backgroundColor: string;
}

export interface Graph3DSettings extends Graph2DSettings {
  zMin: number;
  zMax: number;
  zStep: number;
  viewAngle: {
    theta: number;
    phi: number;
  };
  lighting: boolean;
  wireframe: boolean;
}

export interface GraphPoint {
  x: number;
  y: number;
  z?: number;
}

export interface GraphTrace {
  x: number[];
  y: number[];
  z?: number[];
  type: string;
  mode: string;
  name: string;
  line?: {
    color: string;
    width: number;
  };
  marker?: {
    color: string;
    size: number;
  };
}

export interface GraphLayout {
  title: string;
  xaxis: {
    title: string;
    range: [number, number];
    showgrid: boolean;
    zeroline: boolean;
  };
  yaxis: {
    title: string;
    range: [number, number];
    showgrid: boolean;
    zeroline: boolean;
  };
  zaxis?: {
    title: string;
    range: [number, number];
    showgrid: boolean;
  };
  showlegend: boolean;
  margin: {
    l: number;
    r: number;
    t: number;
    b: number;
  };
}

export interface GraphInteraction {
  type: 'zoom' | 'pan' | 'trace' | 'intersection' | 'derivative' | 'integral';
  point?: GraphPoint;
  region?: {
    start: GraphPoint;
    end: GraphPoint;
  };
}

export interface GraphAnalysis {
  zeros: GraphPoint[];
  extrema: {
    maxima: GraphPoint[];
    minima: GraphPoint[];
  };
  inflectionPoints: GraphPoint[];
  asymptotes: {
    vertical: number[];
    horizontal: number[];
    oblique: { slope: number; intercept: number }[];
  };
  intercepts: {
    x: GraphPoint[];
    y: GraphPoint[];
  };
}
