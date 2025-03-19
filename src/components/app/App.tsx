import { CSSProperties, useState } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState, OptionType } from '../../constants/articleProps';
import styles from '../../styles/index.module.scss';

type ArticleStyles = {
	[K in keyof typeof defaultArticleState]: OptionType;
};

export const App = () => {
	const [articleStyles, setArticleStyles] =
		useState<ArticleStyles>(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleStyles.fontFamilyOption.value,
					'--font-size': articleStyles.fontSizeOption.value,
					'--font-color': articleStyles.fontColor.value,
					'--container-width': articleStyles.contentWidth.value,
					'--bg-color': articleStyles.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				setArticleStyles={setArticleStyles}
				articleStyles={articleStyles}
			/>
			<Article />
		</main>
	);
};
