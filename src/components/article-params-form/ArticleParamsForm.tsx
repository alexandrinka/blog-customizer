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

interface ArticleParamsFormProps {
	onApply: (styles: typeof defaultArticleState) => void;
	onReset: (styles: typeof defaultArticleState) => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	onApply,
	onReset,
}) => {
	const formRef = useRef<HTMLDivElement | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [formValues, setFormValues] = useState(defaultArticleState);
	const [selectedFontFamily, setSelectedFontFamily] = useState(
		fontFamilyOptions[0]
	);
	const [selectedFontSize, setSelectedFontSize] = useState(fontSizeOptions[0]);
	const [selectedFontColors, setSelectedFontColors] = useState(fontColors[0]);
	const [selectedBackgroundColors, setSelectedBackgroundColors] = useState(
		backgroundColors[0]
	);
	const [selectedcontentWidth, setSelectedcontentWidth] = useState(
		contentWidthArr[0]
	);

	const handleFontFamilyChange = (option: OptionType) => {
		setSelectedFontFamily(option);
		setFormValues({ ...formValues, fontFamilyOption: option });
	};

	const handleFontSizeChange = (option: OptionType) => {
		setSelectedFontSize(option);
		setFormValues({ ...formValues, fontSizeOption: option });
	};

	const handleFontColorsChange = (option: OptionType) => {
		setSelectedFontColors(option);
		setFormValues({ ...formValues, fontColor: option });
	};

	const handleBackgroundColorsChange = (option: OptionType) => {
		setSelectedBackgroundColors(option);
		setFormValues({ ...formValues, backgroundColor: option });
	};

	const handleContentWidthChange = (option: OptionType) => {
		setSelectedcontentWidth(option);
		setFormValues({ ...formValues, contentWidth: option });
	};

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (formRef.current && !formRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(formValues);
		setIsOpen(false);
	};

	const handleReset = () => {
		setFormValues(defaultArticleState);
		setSelectedFontFamily(fontFamilyOptions[0]);
		setSelectedFontSize(fontSizeOptions[0]);
		setSelectedFontColors(fontColors[0]);
		setSelectedBackgroundColors(backgroundColors[0]);
		setSelectedcontentWidth(contentWidthArr[0]);
		onReset(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			{isOpen && (
				<aside
					ref={formRef}
					className={`${styles.container} ${
						isOpen ? styles.container_open : ''
					}`}>
					<form className={styles.form} onSubmit={handleSubmit}>
						<div className={styles.formElement}>
							<Text as={'h2'} size={31} weight={800}>
								Задайте параметры
							</Text>
						</div>
						<div className={styles.formElement}>
							<Select
								selected={selectedFontFamily}
								options={fontFamilyOptions}
								placeholder='Выберите шрифт'
								onChange={handleFontFamilyChange}
								title='Шрифт'
							/>
						</div>
						<div className={styles.formElement}>
							<RadioGroup
								name='fontSize'
								options={fontSizeOptions}
								selected={selectedFontSize}
								onChange={handleFontSizeChange}
								title='Размер шрифта'
							/>
						</div>
						<div className={styles.formElement}>
							<Select
								selected={selectedFontColors}
								options={fontColors}
								placeholder='Выберите цвет шрифта'
								onChange={handleFontColorsChange}
								title='Цвет шрифта'
							/>
						</div>
						<div className={styles.formElement}>
							<Separator />
						</div>
						<div className={styles.formElement}>
							<Select
								selected={selectedBackgroundColors}
								options={backgroundColors}
								placeholder='Выберите цвет фона'
								onChange={handleBackgroundColorsChange}
								title='Цвет фона'
							/>
						</div>
						<div className={styles.formElement}>
							<Select
								selected={selectedcontentWidth}
								options={contentWidthArr}
								placeholder='Выберите ширину контента'
								onChange={handleContentWidthChange}
								title='Ширина контента'
							/>
						</div>
						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={handleReset}
							/>
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
