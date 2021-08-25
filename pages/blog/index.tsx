/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Masonry from 'components/Masonry';
import { getGhostPosts } from '../../containers/GhostBlog/ghost';
import Moment from 'moment';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';

const ARTICLES_PER_PAGE = 3;

const breakpointColumnsObj = {
	default: 3,
	1100: 3,
	700: 2,
	500: 1,
};

const blog: React.FC = () => {
	const [pageCount, setPageCount] = useState(0);

	const [, setAllFeaturedBlogPosts] = useState([]);
	const [allBlogPosts, setAllBlogPosts] = useState([]);

	const [featuredBlogPosts, setFeaturedBlogPosts] = useState([]);
	const [blogPosts, setBlogPosts] = useState([]);

	const [displayFeaturedBlogPosts, setDisplayFeaturedBlogPosts] = useState([]);
	const [displayBlogPosts, setDisplayBlogPosts] = useState([]);

	const [searchText, setSearchText] = useState('');

	useState(() => {
		// eslint-disable-next-line eqeqeq
		if (blogPosts.length != 0) return;
		getGhostPosts().then((posts) => {
			let featuredBlogPostsFilter = posts.filter((post: { featured: any }) => post.featured);
			setAllFeaturedBlogPosts(featuredBlogPostsFilter);
			setAllBlogPosts(posts);

			paginateBlogs(0, posts, featuredBlogPostsFilter);
		});
	});

	let handlePageClick = (data) => {
		paginateBlogs(data.selected, blogPosts, featuredBlogPosts);
	};

	let paginateBlogs = (offest, blogPosts, featuredBlogPosts) => {
		setFeaturedBlogPosts(featuredBlogPosts);
		setBlogPosts(blogPosts);

		//only show featured blogs on first page
		if (offest == 0) {
			setDisplayFeaturedBlogPosts(featuredBlogPosts);
		} else {
			setDisplayFeaturedBlogPosts([]);
		}

		const blogCount = blogPosts.length;
		setPageCount(Math.ceil(blogCount / ARTICLES_PER_PAGE));

		const start = offest * ARTICLES_PER_PAGE;
		const end = (offest + 1) * ARTICLES_PER_PAGE;

		const displayBlogs = [];
		for (let i = start; i < end; i++) {
			if (i < blogCount) {
				displayBlogs.push(blogPosts[i]);
			}
		}

		setDisplayBlogPosts(displayBlogs);
	};

	let filterBlogs = (e: { target: { value: any } }) => {
		let searchText = e.target.value;
		setSearchText(searchText);

		console.log('filterBlogs');
		console.log(searchText);

		// eslint-disable-next-line eqeqeq
		let filteredPosts = allBlogPosts.filter((post) => post.html.indexOf(searchText) != -1);

		let filteredFeaturedPosts = []; //don't show featured posts when filtering
		paginateBlogs(0, filteredPosts, filteredFeaturedPosts);
	};

	return (
		<>
			<Head>
				<title>Blog | Synthetix Ambassadors</title>
				<link rel="icon" href="/favicon.ico" />
				<link
					href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
					rel="stylesheet"
					integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
					crossOrigin="anonymous"
				/>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
				></link>
			</Head>
			<Page>
				<>
					<div className="container blog-container">
						<div className="row">
							<div className="col-md-6 col-sm-12">
								<div className="header-search">
									<h1 className="blog-header">Blog</h1>
								</div>
							</div>
							<div className="col-md-6 col-sm-12">
								<div className="search-container">
									<br />
									{/*<form className="searchbox">*/}
									<form>
										<div className="input-group">
											<input
												type="search"
												name="search"
												className="form-control"
												placeholder="Search..."
												required
												value={searchText}
												onChange={filterBlogs}
											/>
											<span>
												<i className="fa fa-search" />
											</span>
										</div>
									</form>
								</div>
							</div>
						</div>
						{displayFeaturedBlogPosts.map((blog) => (
							<Link href={'/blog/' + blog.id}>
								<div className="featured-post">
									<img className="featured-post-img" src={blog.feature_image} alt="img" />
									<p className="blog-date">{Moment(blog.updated_at).format('d MMM yyyy')}</p>
									<h1 className="featured-blog-header">{blog.title}</h1>
									<p className="post-excerpt">{blog.excerpt}</p>
									<div className="read-container">
										<svg
											width={16}
											height={18}
											viewBox="0 0 16 18"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M14.8167 7.49199C14.2172 7.38353 13.6091 7.33053 13 7.33366C12.65 7.33366 12.3083 7.33366 11.9667 7.40033C11.5413 6.83273 10.9984 6.3637 10.375 6.02533C10.9104 5.44054 11.2077 4.67656 11.2083 3.88366C11.2083 3.03055 10.8694 2.21237 10.2662 1.60913C9.66294 1.00589 8.84477 0.666992 7.99166 0.666992C7.13854 0.666992 6.32037 1.00589 5.71713 1.60913C5.11389 2.21237 4.77499 3.03055 4.77499 3.88366C4.7756 4.67656 5.07287 5.44054 5.60832 6.02533C4.98865 6.36546 4.44659 6.83089 4.01666 7.39199C3.69166 7.33366 3.34999 7.33366 2.99999 7.33366C2.39034 7.33603 1.78221 7.39461 1.18332 7.50866C0.989191 7.54416 0.813957 7.6474 0.688822 7.8C0.563686 7.95261 0.49677 8.14467 0.499989 8.34199V15.217C0.49979 15.3394 0.526568 15.4604 0.578419 15.5713C0.63027 15.6822 0.70592 15.7803 0.799989 15.8587C0.893465 15.9375 1.00314 15.9948 1.12123 16.0264C1.23933 16.0581 1.36295 16.0634 1.48332 16.042C1.982 15.9334 2.4898 15.872 2.99999 15.8587C4.61423 15.8569 6.19346 16.3292 7.54166 17.217L7.64999 17.2587C7.76053 17.3066 7.8795 17.3321 7.99999 17.3337C8.07953 17.3327 8.15836 17.3186 8.23332 17.292H8.29166L8.39999 17.2503C9.76102 16.3397 11.3625 15.8553 13 15.8587C13.5091 15.861 14.0169 15.9113 14.5167 16.0087C14.637 16.0301 14.7607 16.0248 14.8787 15.9931C14.9968 15.9614 15.1065 15.9041 15.2 15.8253C15.2941 15.747 15.3697 15.6489 15.4216 15.538C15.4734 15.4271 15.5002 15.3061 15.5 15.1837V8.30866C15.4993 8.11419 15.4306 7.92609 15.3058 7.77695C15.181 7.6278 15.008 7.527 14.8167 7.49199ZM7.99999 2.33366C8.39036 2.36234 8.75543 2.53765 9.02187 2.8244C9.28832 3.11114 9.43641 3.48807 9.43641 3.87949C9.43641 4.27092 9.28832 4.64785 9.02187 4.93459C8.75543 5.22133 8.39036 5.39664 7.99999 5.42533C7.60962 5.39664 7.24455 5.22133 6.9781 4.93459C6.71166 4.64785 6.56356 4.27092 6.56356 3.87949C6.56356 3.48807 6.71166 3.11114 6.9781 2.8244C7.24455 2.53765 7.60962 2.36234 7.99999 2.33366ZM7.16666 15.1087C5.86055 14.5049 4.43888 14.1922 2.99999 14.192C2.72499 14.192 2.44999 14.192 2.16666 14.2337V9.00033C2.86546 8.92215 3.5715 8.93616 4.26666 9.04199H4.35832C5.35132 9.22449 6.30289 9.58592 7.16666 10.1087V15.1087ZM7.99999 8.66699C7.62942 8.45323 7.24527 8.26393 6.84999 8.10033H6.79999C6.52499 7.99199 6.24999 7.88366 5.96666 7.80033C6.54525 7.3398 7.26056 7.08476 7.99999 7.07533C8.73746 7.08 9.45257 7.32912 10.0333 7.78366C9.3259 8.00452 8.64422 8.30066 7.99999 8.66699ZM13.8333 14.2337C12.1222 14.0617 10.3962 14.3494 8.83332 15.067V10.067C9.69865 9.55766 10.6508 9.21296 11.6417 9.05033H11.8083C12.4783 8.94599 13.159 8.92919 13.8333 9.00033V14.2337Z"
												fill="#00D1FF"
											/>
										</svg>
										<span className="blurb"> READ</span>
									</div>
								</div>
							</Link>
						))}
						<Masonry
							breakpointCols={breakpointColumnsObj}
							className="my-masonry-grid"
							columnClassName="my-masonry-grid_column"
						>
							{displayBlogPosts.map((blog) => (
								<div>
									<Link href={'/blog/' + blog.id}>
										<div className="grid-item">
											<img className="featured-post-img" src={blog.feature_image} alt="img" />
											<p className="blog-date">{Moment(blog.updated_at).format('d MMM yyyy')}</p>
											<h1 className="featured-blog-header-masonry">{blog.title}</h1>
											<p className="post-excerpt-masonry">{blog.excerpt}</p>
											<div className="read-container-masonry">
												<svg
													width={16}
													height={18}
													viewBox="0 0 16 18"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M14.8167 7.49199C14.2172 7.38353 13.6091 7.33053 13 7.33366C12.65 7.33366 12.3083 7.33366 11.9667 7.40033C11.5413 6.83273 10.9984 6.3637 10.375 6.02533C10.9104 5.44054 11.2077 4.67656 11.2083 3.88366C11.2083 3.03055 10.8694 2.21237 10.2662 1.60913C9.66294 1.00589 8.84477 0.666992 7.99166 0.666992C7.13854 0.666992 6.32037 1.00589 5.71713 1.60913C5.11389 2.21237 4.77499 3.03055 4.77499 3.88366C4.7756 4.67656 5.07287 5.44054 5.60832 6.02533C4.98865 6.36546 4.44659 6.83089 4.01666 7.39199C3.69166 7.33366 3.34999 7.33366 2.99999 7.33366C2.39034 7.33603 1.78221 7.39461 1.18332 7.50866C0.989191 7.54416 0.813957 7.6474 0.688822 7.8C0.563686 7.95261 0.49677 8.14467 0.499989 8.34199V15.217C0.49979 15.3394 0.526568 15.4604 0.578419 15.5713C0.63027 15.6822 0.70592 15.7803 0.799989 15.8587C0.893465 15.9375 1.00314 15.9948 1.12123 16.0264C1.23933 16.0581 1.36295 16.0634 1.48332 16.042C1.982 15.9334 2.4898 15.872 2.99999 15.8587C4.61423 15.8569 6.19346 16.3292 7.54166 17.217L7.64999 17.2587C7.76053 17.3066 7.8795 17.3321 7.99999 17.3337C8.07953 17.3327 8.15836 17.3186 8.23332 17.292H8.29166L8.39999 17.2503C9.76102 16.3397 11.3625 15.8553 13 15.8587C13.5091 15.861 14.0169 15.9113 14.5167 16.0087C14.637 16.0301 14.7607 16.0248 14.8787 15.9931C14.9968 15.9614 15.1065 15.9041 15.2 15.8253C15.2941 15.747 15.3697 15.6489 15.4216 15.538C15.4734 15.4271 15.5002 15.3061 15.5 15.1837V8.30866C15.4993 8.11419 15.4306 7.92609 15.3058 7.77695C15.181 7.6278 15.008 7.527 14.8167 7.49199ZM7.99999 2.33366C8.39036 2.36234 8.75543 2.53765 9.02187 2.8244C9.28832 3.11114 9.43641 3.48807 9.43641 3.87949C9.43641 4.27092 9.28832 4.64785 9.02187 4.93459C8.75543 5.22133 8.39036 5.39664 7.99999 5.42533C7.60962 5.39664 7.24455 5.22133 6.9781 4.93459C6.71166 4.64785 6.56356 4.27092 6.56356 3.87949C6.56356 3.48807 6.71166 3.11114 6.9781 2.8244C7.24455 2.53765 7.60962 2.36234 7.99999 2.33366ZM7.16666 15.1087C5.86055 14.5049 4.43888 14.1922 2.99999 14.192C2.72499 14.192 2.44999 14.192 2.16666 14.2337V9.00033C2.86546 8.92215 3.5715 8.93616 4.26666 9.04199H4.35832C5.35132 9.22449 6.30289 9.58592 7.16666 10.1087V15.1087ZM7.99999 8.66699C7.62942 8.45323 7.24527 8.26393 6.84999 8.10033H6.79999C6.52499 7.99199 6.24999 7.88366 5.96666 7.80033C6.54525 7.3398 7.26056 7.08476 7.99999 7.07533C8.73746 7.08 9.45257 7.32912 10.0333 7.78366C9.3259 8.00452 8.64422 8.30066 7.99999 8.66699ZM13.8333 14.2337C12.1222 14.0617 10.3962 14.3494 8.83332 15.067V10.067C9.69865 9.55766 10.6508 9.21296 11.6417 9.05033H11.8083C12.4783 8.94599 13.159 8.92919 13.8333 9.00033V14.2337Z"
														fill="#00D1FF"
													/>
												</svg>
												<span className="blurb"> READ</span>
											</div>
										</div>
									</Link>
								</div>
							))}
						</Masonry>
						<div className="pagination wrapper">
							{/*<nav aria-label="Page navigation example">*/}

							<ReactPaginate
								previousLabel={'previous'}
								nextLabel={'next'}
								breakLabel={'...'}
								breakClassName={'break-me'}
								pageCount={pageCount}
								marginPagesDisplayed={2}
								pageRangeDisplayed={ARTICLES_PER_PAGE}
								onPageChange={handlePageClick}
								containerClassName={'pagination'}
								activeClassName={'active'}
							/>

							{/*<ul className="pagination">*/}
							{/*	<li className="page-item">*/}
							{/*		<a className="page-link" href="#">*/}
							{/*			Previous*/}
							{/*		</a>*/}
							{/*	</li>*/}

							{/*    {currentPages.map((pageNo) => (*/}
							{/*        <li className="page-item">*/}
							{/*			<a className="page-link" href="#">*/}
							{/*				{(pageNo == currentPage) && (*/}
							{/*					<b>{pageNo}</b>*/}
							{/*				)}*/}
							{/*				{(pageNo != currentPage) && (*/}
							{/*					<>{pageNo}</>*/}
							{/*				)}*/}
							{/*			</a>*/}
							{/*        </li>*/}
							{/*    ))}*/}

							{/*	<li className="page-item">*/}
							{/*		<a className="page-link" href="#">*/}
							{/*			Next*/}
							{/*		</a>*/}
							{/*	</li>*/}
							{/*</ul>*/}
							{/*</nav>*/}
						</div>
					</div>
					{/* partial */}
				</>
			</Page>
		</>
	);
};

export default blog;

const Page = styled.div`
	padding-bottom: 24px;
`;
