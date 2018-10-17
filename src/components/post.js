import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';

import Layout from './layout'

export default function Template({ data }) {
    const { markdownRemark: post } = data;
    return (
        <Layout>
            <h1>{post.frontmatter.title}</h1>
            <div dangerouslySetInnerHTML = {{__html: post.html}} />
            <Link to="/">Go back to the homepage</Link>
        </Layout>
    )
}

export const postQuery = graphql `
    query BlogPostByPath($path: String!){
        markdownRemark( frontmatter: { path: { eq: $path } }) {
            html
            frontmatter{
                path
                title
            }
        }
    }
`