const comments = [
    {
        id: 1,
        userid: 1,
        parent_comment_id: null,
        content: "This is the first comment",
        children: [
            {
                id: 2,
                userid: 2,
                parent_comment_id: 1,
                content: "This is a reply to the first comment",
                children: [
                    {
                        id: 3,
                        userid: 3,
                        parent_comment_id: 2,
                        content: "This is a reply to the reply",
                        children: []
                    },
                    {
                        id: 4,
                        userid: 4,
                        parent_comment_id: 3,
                        content: "This is a reply to the reply to the reply",
                        children: []
                    }
                ]
            },
            {
                id: 4,
                userid: 4,
                parent_comment_id: 1,
                content: "This is another reply to the first comment",
                children: []
            }
        ]
    },
    {
        id: 5,
        userid: 5,
        parent_comment_id: null,
        content: "This is a second top-level comment",
        children: []
    }
];

function printComments(comments, level = 0) {
    for (const comment of comments) {
        const indentation = "".padEnd(level * 2, " ");
        console.log(indentation + comment.content);
        // Recursively print children if any
        printComments(comment.children, level + 1);
    }
}

printComments(comments)