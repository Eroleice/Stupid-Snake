# Stupid-Snake
Snake with Genetic Algorithm &amp; Neural Netwrok in Javascript!

一个基于神经网络和遗传算法的贪食蛇AI，使用JavaScript编写的网页程序。

## Feature
Create a population pool of 50 snakes, and run them individually. Calculate fitness by movements and length. Pick 5 'good' snake and breed them (cross DNA), mutate children and run them again.

创建一个有50个贪食蛇AI的池，根据移动距离和长度进行打分。选择分数较高的5条蛇来培养下一代。重复该过程。

## How to use
When you open the page, the browser will automatically generate 50 snake AI and run them. Those 50 snakes will list on the right side. You can click on them to see how they act.

当你打开页面，浏览器会自动生成50个贪食蛇AI。50个AI会列举在屏幕右侧，你可以点击它们来查看这些贪食蛇AI是如何操作的。

You can click the 'Breed New Generation' button on the left. Then the browser will use the previous 50 snakes to generate a group of new 50 snake AI. Those new AI will be listed on the right, the previous AI will be removed.

你可以点击屏幕左侧的'Breed New Generation'按钮。浏览器会根据之前的50个贪食蛇AI来生成新的一组50个贪食蛇AI。这些新的AI会列举在屏幕右侧，之前的AI会被移出。

You can click the 'Auto Generating' button to let browser generate new AI every 3 seconds. This would cause some lag when your snake doing good - it takes more time to simulate game. You can click the 'Stop Generating' button to stop this process.

你可以点击'Auto Generating'按钮来让浏览器每3秒钟自动生成新的一代AI，这个功能在AI进化后可能会导致延迟 —— 优秀的AI需要更多的时间来模拟游戏进行。你可以点击'Stope Generating'按钮来终止该进程。

By clicking 'Output Best DNA' you will get a string in the textarea, which is the 'DNA' for the best performance snake AI. You can paste another DNA in the textarea then click 'Adopt Above DNA', that DNA will be placed into one snake and used to generate new snake AI.

点击'Output Best DNA'按钮，你会在下方文本框获得本次最佳得分的贪食蛇AI的DNA。你可以在文本框粘贴DNA并点击'Adopt Above DNA'，浏览器会讲该DNA注入到一个贪食蛇AI内部并培育新的一代贪食蛇AI。

'Use Example DNA' gives you a nice DNA I got through my run, with 32230 fitness (score). You still need to click 'Adopt Above DNA' to see how it works!

'Use Example DNA'会为你提供一条十分优秀的DNA，该DNA可以让贪食蛇AI获得32230的高分。你仍然需要点击'Adopt Above DNA'来激活它。

## Credits
I, as an accounting/finance student, knew nothing about Artificial Intelligence, Machine Learning, Neural Networks, Genetic Algorithm one month before. But I did have hudge interest in these kind of technologies. Thanks to the internet I can get all the knowledge I need for this project. It's one of my dream to create an 'AI' and let it do something. Here's all the source I used/learnt for this project, all these sources are nice and I appreciate for the sharing!

作为一位会计/金融学生，我在一个月前对人工智能、机器学习、神经网络、遗传算法一无所知。然而我对相关的技术十分感兴趣。感谢互联网，我可以在网上找到所有必要的知识。创造一个可以工作的AI一直是我的一个梦想。以下是我在创作过程中用/学习到的所有资料，感谢所有资料的作者的分享！

* [AI learns to play snake using Genetic Algorithm and Deep learning](https://www.youtube.com/watch?v=3bhP7zulFfY) by [Code Bullet](https://www.youtube.com/channel/UC0e3QhIYukixgh5VVpKHH9Q) encouraged me 'Hey, can I also make such a thing?'
* [Snakes, Neural Networks and Genetic Algorithms](https://www.youtube.com/watch?v=BBLJFYr7zB8) by [emgoz](https://www.youtube.com/user/OfficialMGMusic) tells me I need neural network
* [But what *is* a Neural Network? | Deep learning, chapter 1](https://www.youtube.com/watch?v=aircAruvnKk) by [3Blue1Brown](https://www.youtube.com/channel/UCYO_jab_esuFRV4b17AJtAw) gives me the idea of neural network
* [10.14: Neural Networks: Backpropagation Part 1 - The Nature of Codd](https://www.youtube.com/watch?v=QJoa0JYaX1I) by [The Coding Train](https://www.youtube.com/watch?v=QJoa0JYaX1I&t=47s) shows me how the JavaScript code looks like for neural network - thank god JS is one of the couple language I can use
* [Fun with Neural Networks and Genetic Algorithms!](https://www.youtube.com/watch?v=7mNSY86tEFw) by [sirrandalot](https://www.youtube.com/user/sirrandalot) gives me a direct view of how genetic algorithm works with nerual network
* [NEURAL NETWORK TO PLAY A SNAKE GAME](https://towardsdatascience.com/today-im-going-to-talk-about-a-small-practical-example-of-using-neural-networks-training-one-to-6b2cbd6efdb3) by [Slava Korolev](https://towardsdatascience.com/@korolvs?source=post_header_lockup) tells me what input I should give to my snake and what kind of actions I should expect from my snake
* [Let’s evolve a neural network with a genetic algorithm—code included](https://blog.coast.ai/lets-evolve-a-neural-network-with-a-genetic-algorithm-code-included-8809bece164) by [Matt Harvey](https://blog.coast.ai/@harvitronix?source=post_header_lockup) gives me idea about snake with neural network
* [GANN: Genetic algorithm neural networks for the detection of conserved combinations of features in DNA](https://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-6-36) by Robert G Beiko and Robert L Charlebois tells me how to make the DNA works in genetic algorithm

* [AI learns to play snake using Genetic Algorithm and Deep learning](https://www.youtube.com/watch?v=3bhP7zulFfY) by [Code Bullet](https://www.youtube.com/channel/UC0e3QhIYukixgh5VVpKHH9Q) 触动了我: "嘿,我能不能也做一个这么酷的东西出来?"
* [Snakes, Neural Networks and Genetic Algorithms](https://www.youtube.com/watch?v=BBLJFYr7zB8) by [emgoz](https://www.youtube.com/user/OfficialMGMusic) 告诉了我贪食蛇AI可以使用神经网络
* [But what *is* a Neural Network? | Deep learning, chapter 1](https://www.youtube.com/watch?v=aircAruvnKk) by [3Blue1Brown](https://www.youtube.com/channel/UCYO_jab_esuFRV4b17AJtAw) 告诉了我什么是神经网络
* [10.14: Neural Networks: Backpropagation Part 1 - The Nature of Codd](https://www.youtube.com/watch?v=QJoa0JYaX1I) by [The Coding Train](https://www.youtube.com/watch?v=QJoa0JYaX1I&t=47s) 向我展示了神经网络相关的JavaScript代码 —— JS是我掌握的为数不多的几种编程语言之一
* [Fun with Neural Networks and Genetic Algorithms!](https://www.youtube.com/watch?v=7mNSY86tEFw) by [sirrandalot](https://www.youtube.com/user/sirrandalot) 直观地向我展示了遗传算法如何应用于神经网络
* [NEURAL NETWORK TO PLAY A SNAKE GAME](https://towardsdatascience.com/today-im-going-to-talk-about-a-small-practical-example-of-using-neural-networks-training-one-to-6b2cbd6efdb3) by [Slava Korolev](https://towardsdatascience.com/@korolvs?source=post_header_lockup) 告诉了我贪食蛇AI的神经网路可以使用怎样的输入数据，以及贪食蛇的行为应该是怎样的
* [Let’s evolve a neural network with a genetic algorithm—code included](https://blog.coast.ai/lets-evolve-a-neural-network-with-a-genetic-algorithm-code-included-8809bece164) by [Matt Harvey](https://blog.coast.ai/@harvitronix?source=post_header_lockup) 给了我一些关于贪食蛇AI的点子
* [GANN: Genetic algorithm neural networks for the detection of conserved combinations of features in DNA](https://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-6-36) by Robert G Beiko and Robert L Charlebois 教会了我如何具体操作遗传算法中的DNA

## Final words
It's so nice to see the program finally workes as expected. I've been working on this thing for nearly one and half week. Before doing it I didn't even believe I can finish it.

能够看到这个程序如预期一样运行我十分开心。我在这个程序上一共花费了大约一周半的时间，在此之前我甚至无法相信我最终可以完成这个程序。

I re-wrote this program couple times, with either NodeJS or browser. Before today, I never get my Genetic Algorithm module function well - those snakes never got clever.

我多次在NodeJS或浏览器上重写了这个程序。在今天之前，我从来没有让遗传算法模块正常工作过 - 所有的AI从来不会变得更聪明。

It's the most exciting moment when today I finally see the fitness jumped from 50 to 200-ish and immediately break 1k. I knew it's done.

今天当我看到适应度从50突然跳到200多，并且迅速突破1000时，是我这几天最激动的时刻。我知道我成功了。

So this is it. I succeed.

就是这样，我成功了。

## License
MIT
