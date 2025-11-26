import React from 'react';
import Svg, { Path, Circle, Rect, G, Defs, LinearGradient, Stop } from 'react-native-svg';

// Target/Goal Icon
export const TargetIcon = ({ size = 24, color = '#3292FF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
    <Circle cx="12" cy="12" r="6" stroke={color} strokeWidth="2" fill="none" />
    <Circle cx="12" cy="12" r="2" fill={color} />
  </Svg>
);

// Timer/Clock Icon
export const TimerIcon = ({ size = 24, color = '#FF6B6B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="13" r="9" stroke={color} strokeWidth="2" />
    <Path d="M12 8V13L15 15" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M9 2H15" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M12 2V5" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// Fire/Calories Icon
export const FireIcon = ({ size = 24, color = '#FFB800' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C12 2 7 6 7 11C7 14.866 9.686 18 13 18C16.314 18 19 14.866 19 11C19 8 17 6 17 6C17 6 17.5 8.5 16 10C16 10 15 7 12 2Z"
      fill={color}
    />
    <Path
      d="M10 11C10 11 9 13 9 15C9 16.657 10.343 18 12 18C13.657 18 15 16.657 15 15C15 13.5 14 12 14 12C14 12 14.25 13.25 13.5 14C13.5 14 13 12 10 11Z"
      fill={color}
      opacity="0.6"
    />
    <Path d="M8 19C6 20 5 22 6 23H18C19 22 18 20 16 19" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// Dumbbell/Strength Icon
export const DumbbellIcon = ({ size = 24, color = '#3292FF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="2" y="9" width="3" height="6" rx="1" fill={color} />
    <Rect x="19" y="9" width="3" height="6" rx="1" fill={color} />
    <Rect x="5" y="10" width="2" height="4" fill={color} />
    <Rect x="17" y="10" width="2" height="4" fill={color} />
    <Rect x="7" y="11" width="10" height="2" rx="1" fill={color} />
  </Svg>
);

// Running Icon
export const RunningIcon = ({ size = 24, color = '#3292FF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="13" cy="4" r="2" fill={color} />
    <Path
      d="M7 22L10 17L11 13L8 11L6 14"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11 13L14 11L16 8L15 6L11 7"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 8L18 6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path
      d="M10 17L13 21"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

// Yoga/Meditation Icon
export const YogaIcon = ({ size = 24, color = '#3292FF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="5" r="2" fill={color} />
    <Path
      d="M12 8C12 8 10 10 7 12C5 13 3 13 2 12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path
      d="M12 8C12 8 14 10 17 12C19 13 21 13 22 12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path d="M12 8V14" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M12 14L9 22" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M12 14L15 22" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// Bike/Cycling Icon
export const BikeIcon = ({ size = 24, color = '#3292FF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="5" cy="18" r="3" stroke={color} strokeWidth="2" fill="none" />
    <Circle cx="19" cy="18" r="3" stroke={color} strokeWidth="2" fill="none" />
    <Path d="M12 8L14 12L19 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M10 12L5 18" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M10 12H14" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Circle cx="14" cy="6" r="2" fill={color} />
    <Path d="M14 8L16 6" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// Pull-up/Bar Icon
export const PullUpIcon = ({ size = 24, color = '#3292FF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 3H21" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M8 3V6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M16 3V6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Circle cx="12" cy="9" r="2" fill={color} />
    <Path d="M12 11V15" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M12 15L9 20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M12 15L15 20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M12 11L8 13" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M12 11L16 13" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// Plank/Core Icon
export const PlankIcon = ({ size = 24, color = '#3292FF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="18" cy="8" r="2" fill={color} />
    <Path
      d="M4 16L8 14L18 10L20 12L16 18"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <Path d="M8 14L6 20" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// Burpee/Jump Icon
export const BurpeeIcon = ({ size = 24, color = '#3292FF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="4" r="2" fill={color} />
    <Path d="M12 6V12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M12 12L8 10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M12 12L16 10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M12 12L10 18" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M12 12L14 18" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M8 10L6 8" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M16 10L18 8" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Circle cx="10" cy="19" r="1" fill={color} />
    <Circle cx="14" cy="19" r="1" fill={color} />
  </Svg>
);

// Shoulder Press Icon
export const ShoulderPressIcon = ({ size = 24, color = '#3292FF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="5" r="2" fill={color} />
    <Path d="M12 7V13" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M12 13L9 21" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M12 13L15 21" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M12 9L6 7L4 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 9L18 7L20 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Rect x="3" y="6" width="2" height="4" rx="1" fill={color} />
    <Rect x="19" y="6" width="2" height="4" rx="1" fill={color} />
  </Svg>
);

// Squat Icon
export const SquatIcon = ({ size = 24, color = '#3292FF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="4" r="2" fill={color} />
    <Path d="M12 6V10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M8 8L12 10L16 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 10V14" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M8 14L10 22" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M16 14L14 22" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M8 14H16" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// Deadlift Icon
export const DeadliftIcon = ({ size = 24, color = '#3292FF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="5" r="2" fill={color} />
    <Path d="M12 7C12 7 10 11 10 13C10 15 10 18 10 22" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M12 7C12 7 14 11 14 13C14 15 14 18 14 22" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M7 14H17" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Circle cx="6" cy="14" r="2" stroke={color} strokeWidth="1.5" fill="none" />
    <Circle cx="18" cy="14" r="2" stroke={color} strokeWidth="1.5" fill="none" />
    <Path d="M12 7L12 12" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// Bench Press Icon
export const BenchPressIcon = ({ size = 24, color = '#3292FF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="2" y="10" width="2" height="4" rx="1" fill={color} />
    <Rect x="20" y="10" width="2" height="4" rx="1" fill={color} />
    <Path d="M4 12H20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Circle cx="12" cy="6" r="2" fill={color} />
    <Path d="M8 12L10 16L12 22" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M16 12L14 16L12 22" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 8V12" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// Home Icon
export const HomeIcon = ({ size = 24, color = '#8E8E93' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Library/Book Icon
export const LibraryIcon = ({ size = 24, color = '#8E8E93' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M4 19.5C4 18.1193 5.11929 17 6.5 17H20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M6.5 3H20V21H6.5C5.11929 21 4 19.8807 4 18.5V5.5C4 4.11929 5.11929 3 6.5 3Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M8 7H16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M8 11H16" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// Program/List Icon
export const ProgramIcon = ({ size = 24, color = '#8E8E93' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="2" />
    <Path d="M7 7H17" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M7 12H17" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M7 17H13" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// Calendar Icon
export const CalendarIcon = ({ size = 24, color = '#8E8E93' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="4" width="18" height="18" rx="2" stroke={color} strokeWidth="2" />
    <Path d="M3 10H21" stroke={color} strokeWidth="2" />
    <Path d="M8 2V6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M16 2V6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Circle cx="8" cy="14" r="1" fill={color} />
    <Circle cx="12" cy="14" r="1" fill={color} />
    <Circle cx="16" cy="14" r="1" fill={color} />
    <Circle cx="8" cy="18" r="1" fill={color} />
    <Circle cx="12" cy="18" r="1" fill={color} />
  </Svg>
);

// Chat/Message Icon
export const ChatIcon = ({ size = 24, color = '#8E8E93' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="9" cy="10" r="1" fill={color} />
    <Circle cx="12" cy="10" r="1" fill={color} />
    <Circle cx="15" cy="10" r="1" fill={color} />
  </Svg>
);

// Star Icon (for beginner)
export const StarIcon = ({ size = 24, color = '#00E676' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      fill={color}
    />
  </Svg>
);

// Trophy Icon (for advanced)
export const TrophyIcon = ({ size = 24, color = '#FFD700' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 9C6 9 4.5 9 4 11C3.5 13 4 14 6 14" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M18 9C18 9 19.5 9 20 11C20.5 13 20 14 18 14" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M6 7H18V13C18 15.7614 15.7614 18 13 18H11C8.23858 18 6 15.7614 6 13V7Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 18V21" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M8 21H16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M6 4H18" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// Medal Icon (for intermediate)
export const MedalIcon = ({ size = 24, color = '#3292FF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="15" r="6" stroke={color} strokeWidth="2" fill="none" />
    <Circle cx="12" cy="15" r="3" fill={color} />
    <Path d="M8.5 9L9 15" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M15.5 9L15 15" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M8.5 9L12 3L15.5 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Plus Icon
export const PlusIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 5V19" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M5 12H19" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// Edit Icon
export const EditIcon = ({ size = 24, color = '#3292FF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Delete/Trash Icon
export const TrashIcon = ({ size = 24, color = '#FF6B6B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 6H5H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Rocket Icon (for programs)
export const RocketIcon = ({ size = 24, color = '#FF6B6B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2C12 2 5 8 5 14C5 17 7 19 7 19L12 16L17 19C17 19 19 17 19 14C19 8 12 2 12 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <Circle cx="12" cy="11" r="2" fill={color} />
    <Path d="M7 19L5 22H9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M17 19L19 22H15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Heart Icon
export const HeartIcon = ({ size = 24, color = '#FF6B6B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.84 4.61C20.3292 4.099 19.7228 3.69365 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69365 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.61Z"
      fill={color}
    />
  </Svg>
);

// Lightning Icon
export const LightningIcon = ({ size = 24, color = '#FFB800' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
      fill={color}
    />
  </Svg>
);

// Settings Icon
export const SettingsIcon = ({ size = 24, color = '#3292FF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" fill="none" />
    <Path d="M12 1V3" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M12 21V23" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M4.22 4.22L5.64 5.64" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M18.36 18.36L19.78 19.78" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M1 12H3" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M21 12H23" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M4.22 19.78L5.64 18.36" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M18.36 5.64L19.78 4.22" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// Swimming Icon
export const SwimmingIcon = ({ size = 24, color = '#3292FF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="8" cy="5" r="2" fill={color} />
    <Path d="M6 10L10 8L14 10L16 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M3 14C4 14 5 15 6 15C7 15 8 14 9 14C10 14 11 15 12 15C13 15 14 14 15 14C16 14 17 15 18 15C19 15 20 14 21 14" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M3 18C4 18 5 19 6 19C7 19 8 18 9 18C10 18 11 19 12 19C13 19 14 18 15 18C16 18 17 19 18 19C19 19 20 18 21 18" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// Jump Rope Icon
export const JumpRopeIcon = ({ size = 24, color = '#3292FF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="5" r="2" fill={color} />
    <Path d="M12 7V11" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M12 11L9 15L8 21" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M12 11L15 15L16 21" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M9 9L6 11L4 10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M15 9L18 11L20 10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M4 10C4 10 3 14 5 18" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M20 10C20 10 21 14 19 18" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// Rowing Icon
export const RowingIcon = ({ size = 24, color = '#3292FF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="15" cy="5" r="2" fill={color} />
    <Path d="M12 8L15 7L18 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 8L10 12L8 18" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M15 7V12L17 18" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M4 14L8 12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M2 20H22" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// Push-up Icon
export const PushUpIcon = ({ size = 24, color = '#3292FF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="18" cy="6" r="2" fill={color} />
    <Path d="M4 18L9 15L18 8L20 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M9 15L7 20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M18 8L16 12L18 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M2 20H8" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// Lunge Icon
export const LungeIcon = ({ size = 24, color = '#3292FF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="4" r="2" fill={color} />
    <Path d="M12 6V10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M8 8L12 10L16 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M8 10L6 18L4 22" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M16 10L18 16L20 20" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// Crunch/Sit-up Icon
export const CrunchIcon = ({ size = 24, color = '#3292FF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="8" cy="6" r="2" fill={color} />
    <Path d="M5 10C5 10 7 12 8 13C9 14 10 16 10 18" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M11 10C11 10 9 12 8 13" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M8 13L6 16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M8 13L10 16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Rect x="12" y="14" width="10" height="2" rx="1" fill={color} />
    <Rect x="14" y="18" width="8" height="2" rx="1" fill={color} />
  </Svg>
);

// Kettlebell Icon
export const KettlebellIcon = ({ size = 24, color = '#3292FF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="15" r="6" stroke={color} strokeWidth="2" fill="none" />
    <Path d="M9 9C9 9 9 7 12 7C15 7 15 9 15 9" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Rect x="10" y="4" width="4" height="3" rx="1" stroke={color} strokeWidth="2" fill="none" />
  </Svg>
);

// Box Jump Icon
export const BoxJumpIcon = ({ size = 24, color = '#3292FF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="3" r="2" fill={color} />
    <Path d="M12 5V9" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M12 9L9 7" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M12 9L15 7" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M12 9L10 14L12 14L14 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Rect x="6" y="14" width="12" height="8" stroke={color} strokeWidth="2" fill="none" />
  </Svg>
);

// Pilates Icon
export const PilatesIcon = ({ size = 24, color = '#3292FF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="5" r="2" fill={color} />
    <Path d="M8 10C8 10 10 8 12 8C14 8 16 10 16 10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M12 8V14" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M8 10L6 13L8 20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M16 10L18 13L16 20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="12" cy="14" r="1" fill={color} />
  </Svg>
);

// User Icon
export const UserIcon = ({ size = 24, color = '#8E8E93' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="8" r="4" stroke={color} strokeWidth="2" fill="none" />
    <Path d="M4 21V19C4 16.7909 5.79086 15 8 15H16C18.2091 15 20 16.7909 20 19V21" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// Logout Icon
export const LogoutIcon = ({ size = 24, color = '#FF6B6B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M16 17L21 12L16 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M21 12H9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Chart Icon
export const ChartIcon = ({ size = 24, color = '#3292FF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M18 20V10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 20V4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M6 20V14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
