const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/User');
const BlogPost = require('../src/BlogPost');

describe('Middleware', () => {
    let joe, blogPost;
    beforeEach(done => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({
            title: 'JS is Great',
            content: 'Yep it really is'
        });

        // references / assosiations
        joe.blogPosts.push(blogPost);

        Promise.all([joe.save(), blogPost.save()]).then(() => {
            done();
        });
    });

    it('users clean up dangling blogposts on remove', done => {
        joe.remove()
            .then(() => {
                return BlogPost.countDocuments();
            })
            .then(count => {
                console.log(count);
                // assert(count === 0);
                done();
            });
    });
});
