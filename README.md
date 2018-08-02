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

You can click the 'Auto Generating' button to let browser generate new AI every 1 seconds. This would cause some lag when your snake doing good - it takes more time to simulate game. You can click the 'Stop Generating' button to stop this process.

你可以点击'Auto Generating'按钮来让浏览器每1秒钟自动生成新的一代AI，这个功能在AI进化后可能会导致延迟 —— 优秀的AI需要更多的时间来模拟游戏进行。你可以点击'Stope Generating'按钮来终止该进程。

By clicking 'Output Best DNA' you will get a string in the textarea, which is the 'DNA' for the best performance snake AI. You can paste another DNA in the textarea then click 'Adopt Above DNA', that DNA will be placed into one snake and used to generate new snake AI.

点击'Output Best DNA'按钮，你会在下方文本框获得本次最佳得分的贪食蛇AI的DNA。你可以在文本框粘贴DNA并点击'Adopt Above DNA'，浏览器会讲该DNA注入到一个贪食蛇AI内部并培育新的一代贪食蛇AI。

'Use Example DNA' gives you a nice DNA I got through my run, with 32230 fitness (score). You still need to click 'Adopt Above DNA' to see how it works!

'Use Example DNA'会为你提供一条十分优秀的DNA，该DNA可以让贪食蛇AI获得32230的高分。你仍然需要点击'Adopt Above DNA'来激活它。

## Credits
I, as an accounting/finance student, knew nothing about Artificial Intelligence, Machine Learning, Neural Networks, Genetic Algorithm one month before. But I did have hudge interest in these kind of technologies. Thanks to the internet I can get all the knowledge I need for this project. It's one of my dream to create an 'AI' and let it do something. Here's all the source I used/learnt for this project, all these sources are nice and I appreciate for the sharing!

作为一位会计/金融学生，我在一个月前对人工智能、机器学习、神经网络、遗传算法一无所知。然而我对相关的技术十分感兴趣。感谢互联网，我可以在网上找到所有必要的知识。创造一个可以工作的AI一直是我的一个梦想。以下是我在创作过程中用/学习到的所有资料，感谢所有资料的作者的分享！
