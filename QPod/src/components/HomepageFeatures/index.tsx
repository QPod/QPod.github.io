import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use | 开箱即用',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Start your data science / AI projects with nearly <code>zero configuration</code>. <br/>
        Setting you free from tedious installation/configuration work,
        by putting everything about installing (latest) packages and configuring environment into standard container images. <br/>
        避免繁琐的环境配置、安装过程，QPod已经把常用的、最新的环境和工具封装在容器镜像中。
      </>
    ),
  },
  {
    title: 'Reprodicubility | 易于复现',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
         Make your work more easy-to-reproduce. <br/>
         Making scientific research or data analysis project as <a href="https://doi.org/10.1038/d41586-018-07196-1">reproducible pipelines</a>,
         which help you <a href="https://doi.org/10.1038/515151a">share your work with others.</a> <br/>
         QPod让科学研究和数据分析项目成为<a href="https://doi.org/10.1038/d41586-018-07196-1">可复现的工作流(reproducible pipelines)</a>，让你更好地和同行<a href="https://doi.org/10.1038/515151a">分享你的工作</a>。
      </>
    ),
  },
  {
    title: 'Scale-up and Scale-out | 更易扩展',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Easily scale-up / scale-out your algorithms and key innovations. <br/>
        Moving forward smoothly from the development stage to deployment stage,
        by re-using these container images to either to provide RESTful APIs or orchestrate map/reduce operations on big data. <br/>
        QPod让你把自己在开发环境所作的算法、关键创新无缝、极其简单地部署到生产环境并进行横向、纵向扩展，如提供RESTful API、进行map/reduce操作等。
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
