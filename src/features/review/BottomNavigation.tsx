import { type MouseEventHandler } from 'react';
import { css, type Theme } from '@emotion/react';
import { m } from 'framer-motion';

import Button from '~/components/button/Button';
import { ArrowCircleButton } from '~/components/button/CircleButton';
import { defaultFadeInVariants } from '~/constants/motions';

import { type IsLastQuestion } from './steps/type';
import { fixedBottomCss } from './style';

interface Props extends IsLastQuestion {
  onBackClick?: MouseEventHandler<HTMLButtonElement>;
  isBackDisabled?: boolean;
  onNextClick?: MouseEventHandler<HTMLButtonElement>;
  isNextDisabled?: boolean;
}

const BottomNavigation = ({
  onBackClick,
  isBackDisabled,
  onNextClick,
  isNextDisabled,
  isLastQuestion = false,
}: Props) => {
  return (
    <>
      <m.div css={wrapperCss} variants={defaultFadeInVariants} initial="initial" animate="animate" exit="exit">
        <ArrowCircleButton onClick={onBackClick} disabled={isBackDisabled} />
        <Button
          onClick={onNextClick}
          disabled={isNextDisabled}
          css={buttonCss}
          color={isLastQuestion ? 'blue' : 'navy'}
        >
          {isLastQuestion ? '피드백 제출하기' : '다음'}
        </Button>
      </m.div>
      <div css={wrapperRemainerCss} />
    </>
  );
};

export default BottomNavigation;

const wrapperCss = (theme: Theme) => css`
  ${fixedBottomCss(theme)};
  bottom: 0%;

  display: flex;
  justify-content: space-between;

  height: 104px;
  padding-top: 36px;
  padding-bottom: 12px;

  background: linear-gradient(180deg, rgb(255 255 255 / 0%) 0%, #fff 100%);
`;

const buttonCss = css`
  width: 168px;
`;

const wrapperRemainerCss = css`
  flex-shrink: 0;
  height: 104px;
`;
