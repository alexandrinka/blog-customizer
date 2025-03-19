import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from '../../constants/articleProps';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import clsx from 'clsx';
import useOutsideClick from 'src/hooks/useOutsideClick';

interface ArticleParamsFormProps {
	setArticleStyles: (styles: typeof defaultArticleState) => void;
	articleStyles: typeof defaultArticleState;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	setArticleStyles,
	articleStyles,
}) => {
	const formRef = useRef<HTMLDivElement | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const [formValues, setFormValues] = useState(articleStyles);

	useOutsideClick(formRef, () => {
		if (isOpen) {
			setIsOpen(false);
		}
	});

	useEffect(() => {
		if (isOpen) setIsMounted(true);
	}, [isOpen]);

	const handleChange = (option: OptionType, field: keyof typeof formValues) => {
		setFormValues({ ...formValues, [field]: option });
	};

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setArticleStyles({
			fontFamilyOption: formValues.fontFamilyOption,
			fontSizeOption: formValues.fontSizeOption,
			fontColor: formValues.fontColor,
			backgroundColor: formValues.backgroundColor,
			contentWidth: formValues.contentWidth,
		});
		setIsOpen(false);
	};

	const handleReset = () => {
		setFormValues({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontSizeOption: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		});
		setArticleStyles(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			{isMounted && (
				<aside
					ref={formRef}
					className={clsx(styles.container, {
						[styles.container_open]: isOpen,
					})}>
					<form
						className={styles.form}
						onSubmit={handleSubmit}
						onReset={handleReset}>
						<Text as={'h2'} size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
						<Select
							selected={formValues.fontFamilyOption}
							options={fontFamilyOptions}
							placeholder='Выберите шрифт'
							onChange={(selected) =>
								handleChange(selected, 'fontFamilyOption')
							}
							title='Шрифт'
						/>
						<RadioGroup
							selected={formValues.fontSizeOption}
							options={fontSizeOptions}
							name='fontSize'
							onChange={(selected) => handleChange(selected, 'fontSizeOption')}
							title='Размер шрифта'
						/>
						<Select
							selected={formValues.fontColor}
							options={fontColors}
							placeholder='Выберите цвет шрифта'
							onChange={(selected) => handleChange(selected, 'fontColor')}
							title='Цвет шрифта'
						/>
						<Separator />
						<Select
							selected={formValues.backgroundColor}
							options={backgroundColors}
							placeholder='Выберите цвет фона'
							onChange={(selected) => handleChange(selected, 'backgroundColor')}
							title='Цвет фона'
						/>
						<Select
							selected={formValues.contentWidth}
							options={contentWidthArr}
							placeholder='Выберите ширину контента'
							onChange={(selected) => handleChange(selected, 'contentWidth')}
							title='Ширина контента'
						/>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' htmlType='reset' type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
