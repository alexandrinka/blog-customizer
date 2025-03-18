import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, OptionType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

type ArticleStyles = {
	[K in keyof typeof defaultArticleState]: OptionType;
};

const App = () => {
	const [articleStyles, setArticleStyles] =
		useState<ArticleStyles>(defaultArticleState);

	const handleApply = (newStyles: ArticleStyles) => {
		// Указываем тип для newStyles
		setArticleStyles(newStyles);
	};

	const handleReset = (initialStyles: ArticleStyles) => {
		// Указываем тип для initialStyles
		setArticleStyles(initialStyles);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleStyles.fontFamilyOption.value,
					'--font-size': articleStyles.fontSizeOption.value,
					'--font-color': articleStyles.fontColor.value,
					'--container-width': articleStyles.contentWidth.value,
					'--bg-color': articleStyles.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={handleApply} onReset={handleReset} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
