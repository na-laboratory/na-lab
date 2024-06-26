import { type ChangeEventHandler } from 'react';
import { css, type Theme } from '@emotion/react';

import XIcon from '~/components/icons/XIcon';
import { HEAD_2_REGULAR } from '~/styles/typo';

interface Props {
  value: string;
  isFocused: boolean;

  onChange: ChangeEventHandler<HTMLInputElement>;
  onFocus: () => void;
  onBlur: () => void;
  onDelete: () => void;

  isLast?: boolean;
  isEssential?: boolean;
}

const SelectionTextfield = ({ value, isFocused, onDelete, onChange, onFocus, onBlur, isLast, isEssential }: Props) => {
  if (isLast) {
    return (
      <div css={containerCss}>
        <input type="text" placeholder="다른 옵션 추가..." css={inputCss} value={value} onChange={onChange} />
      </div>
    );
  }

  return (
    <div css={containerCss}>
      <input
        type="text"
        placeholder="옵션을 입력하세요"
        css={(theme) => itemCss(theme, isEssential)}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      {!isFocused && (
        <button type="button" css={iconCss} onClick={onDelete}>
          <XIcon color="#C7D6FF" />
        </button>
      )}
    </div>
  );
};

export default SelectionTextfield;

const containerCss = css`
  position: relative;
`;

const iconCss = css`
  all: unset;

  cursor: pointer;

  position: absolute;
  top: 16px;
  right: 16px;
  bottom: 16px;

  margin: auto;
`;

const inputCoreCss = (theme: Theme) => css`
  ${HEAD_2_REGULAR}
  box-sizing: border-box;
  width: 100%;
  height: 56px;
  padding: 14px 16px;

  color: ${theme.colors.black};

  border-radius: 8px;

  &::placeholder {
    color: ${theme.colors.gray_400};
  }
`;

const itemCss = (theme: Theme, isEssential?: boolean) => css`
  ${inputCoreCss(theme)}
  padding-right: 48px;

  ${isEssential
    ? css`
        background-color: ${theme.colors.primary_100};
        border: 1.5px solid ${theme.colors.primary_100};
      `
    : css`
        background-color: ${theme.colors.primary_50};
        border: 1.5px solid ${theme.colors.primary_50};
      `}

  &:focus {
    padding-right: 0;
    border: 1.5px solid #638fff59;
    outline: 1px solid #638fff59;
  }
`;

const inputCss = (theme: Theme) => css`
  ${inputCoreCss(theme)}
  border: 1px dashed #c9cfdf;

  &::placeholder {
    color: ${theme.colors.gray_400};
  }

  &:focus {
    outline: none;
  }
`;
