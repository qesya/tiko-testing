import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import {StackParamList} from '@navigation/screen';

export const rootNavigationRef = createNavigationContainerRef<StackParamList>();

export function navigateBack() {
  rootNavigationRef.goBack();
}
export const navigateToStart = () => {
  rootNavigationRef.dispatch(StackActions.popToTop());
  rootNavigationRef.goBack();
};
