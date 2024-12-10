import {NativeStackScreenProps} from '@react-navigation/native-stack';

export enum MODAL_SCREEN {
  HEADERANAIMATION = 'HEADERANAIMATION',
}

export enum APP_SCREEN {
  HOME = 'HOME',
}

export type RootStackParamList = {
  [APP_SCREEN.HOME]: undefined;
  [MODAL_SCREEN.HEADERANAIMATION]: undefined;
};

export type StackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
