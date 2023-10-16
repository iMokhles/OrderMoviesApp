import React, {FC, ReactNode} from 'react';
import {View, ViewStyle, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface AppLayoutProps {
  edges?: Array<'top' | 'right' | 'bottom' | 'left'>;
  loading?: boolean;
  hasSafeArea?: boolean;
  disableScrollView?: boolean;
  style?: ViewStyle;
  children?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
}

const AppLayout: FC = (props: AppLayoutProps) => {
  const {children, hasSafeArea, edges, style, header, footer, loading} = props;
  const _renderContent = () => {
    if (hasSafeArea) {
      return (
        <View
          style={{
            flex: 1,
          }}>
          <SafeAreaView edges={edges} style={[styles.container, style]}>
            {header && header}
            {children}
            {footer && footer}
          </SafeAreaView>
        </View>
      );
    }
    return (
      <View style={[styles.container, style]}>
        {header && header}
        {children}
        {footer && footer}
      </View>
    );
  };
  return _renderContent();
};

export default AppLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    height: '100%',
    width: '100%',
  },
});
