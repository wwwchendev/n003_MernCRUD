// 1.載入定義好的模型
const Post = require('../models/post')

// 2.新增文章(Post.create)的處理方法 
exports.create = async (req, res) => {
    try {
        // 1.接收到req.body內容，解析並宣告為變數
        console.log(req.body); //>>{title:'第三篇貼文',content:'hello3'}    
        const { title, content, user } = req.body;
        // 這裡決定了slug的值
        const slug = title

        // 2.驗證validate
        // true 是 switch 語句的表達式，它總是評估為 true，因為它是常數值。
        // 因此，這個 switch 語句實際上等同於一連串 if 條件句。
        switch (true) {
            case !title: throw new Error('必須輸入標題');
            case !content: throw new Error('必須輸入內容');
        }

        // 3.建立資料
        // 使用自定義的mongoose.model物件"Post"當中的create方法
        // 這個方法接受一個包含要創建的文檔數據的物件作為第一個參數，並接受回調函數作為第二個參數，用於處理創建操作的結果。
        const post = await Post.create({ title, content, user, slug })

        // 4.設定回應內容
        res.json(post);

    } catch (err) {
        // 5.錯誤處理
        console.log(err)
        if (err.code == 11000) {
            res.status(400).json({
                message: `已存在相同標題:${err.keyValue.slug}`,
                error: err.message
            });
        } else {
            res.status(400).json({
                error: err.message
            });
        }
    }
};

// 3.讀取列表(Post.find)的處理方法 
exports.list = async (req, res) => {
    try {
        // 1.使用 Mongoose 的 Post.find方法來查找所有的貼文。
        // .limit(10): 將查詢結果限制為最多 10 筆貼文。
        // .sort({ createdAt: -1 }): 按照 createdAt 欄位的值以降序排序，這樣最新的貼文將出現在列表的頂部。
        const posts = await Post.find({})
            .limit(10)
            .sort({ createdAt: -1 });
        // 2.以JSON格式返回找到的資料
        res.json(posts)
    } catch (err) {
        // 3.錯誤處理
        console.log(err)
        res.status(500).json({ error: '取得列表時出現錯誤' });
    }
}

// 4.讀取單篇貼文邏輯 Post.findOne
exports.read = async (req, res) => {
    try {
        // 1. 由於slug是貼文的唯一識別標識，因此從 URL 中的 :slug 參數獲取值。
        // http://localhost:8000/api/post/:slug
        // console.log(req.params.slug)
        const { slug } = req.params
        // 2.使用 Mongoose 的 Post.findOne 方法，根據 slug 查找單篇貼文。
        const post = await Post.findOne({ slug })
        // 3.以JSON格式返回找到的資料
        res.json(post)
    } catch (err) {
        // 4.錯誤處理
        console.log(err);
        //向客戶端返回一個 500 錯誤響應與內容。
        res.status(500).json({ error: '取得貼文時出現錯誤' });
    }
}

// 5.更新貼文邏輯 Post.findOneAndUpdate()
exports.update = async (req, res) => {
    try {
        // 1.由於slug是貼文的唯一識別標識，因此從URL中的:slug參數獲取值。
        // http://localhost:8000/api/post/:slug
        const { slug } = req.params

        // 2.接收到req.body內容，解析並宣告為變數
        // console.log(req.body);
        const { title, content, user } = req.body

        // 3.將slug與title保持同步。
        const newSlug = title

        // 4.使用 Mongoose 的 Post.findOneAndUpdate 方法，用於尋找符合查詢條件的第一個文件並將其更新`,它接受三個參數：
        // (1)查詢條件物件：`{ slug }`，這是尋找文件的條件，其中 `slug` 是要匹配的欄位。        
        // (2)更新的欄位和值物件：`{ title, content, user, slug: newSlug }`。
        // (3)選項對象：`{ new: true }`，這是一個選項對象，指定更新後返回更新的文檔而不是原始文檔。 
        const updatedPost
            = await Post.findOneAndUpdate(
                { slug },
                { title, content, user, slug: newSlug },
                { new: true }
            )

        //5.以JSON格式返回找到的資料
        res.json(updatedPost)

    } catch (err) {
        //6.錯誤處理
        console.log(err)
        res.status(500).json({ error: '更新貼文時出現錯誤' });
    }
}

// 6.移除貼文邏輯 Post.findOneAndDelete({slug})
exports.remove = async(req, res) => {    
    try{
        // 1.由於slug是貼文的唯一識別標識，因此從URL中的:slug參數獲取值。
        // http://localhost:8000/api/post/:slug
        const {slug} = req.params
        // 2.使用 Mongoose 的 Post.findOneAndDelete 方法，根據 slug 查找單篇貼文並刪除。
        const removePost = await Post.findOneAndDelete({slug})
        // 3.以JSON格式返回包含msg的響應物件
        res.json({message:`已刪除貼文: ${removePost.title}`});
    } catch (err) {
        // 4.錯誤處理
        if (err) console.log(err) 
        res.status(500).json({ error: '刪除貼文時出現錯誤' });}
}