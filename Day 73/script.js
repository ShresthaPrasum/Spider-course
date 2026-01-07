function createCard(channel, thumbnail, videoleng, view, times, title ){
    
    let thumbnail1 = document.createElement("div")
    let container= document.querySelector(".container")

    container.setAttribute("style","background-color: black; display: flex; max-width: 700px;align-items: center; position:relative; ")

    thumbnail1.setAttribute("class","thumbnail-section");
    container.append(thumbnail1);
    thumbnail1.setAttribute("style","align-items: center;margin-left: 15px;")

    let img = document.createElement("img");
    thumbnail1.append(img);
    img.setAttribute("style","position: fixed; width: 132px; height: 80px; border-radius: 10px;");
    img.setAttribute("src",thumbnail);


    let videolength = document.createElement("p")
    thumbnail1.append(videolength);
    videolength.innerHTML= videoleng
    videolength.setAttribute("style","padding: 1px 2px 1.5px 2px ;font-size: 11px;border-radius: 3px;font-size: 11px;margin-left: 97.5px; margin-top: 67px;background-color: rgb(36, 35, 35);z-index: 2;")

    let thumbnail2= document.createElement("div")
    thumbnail2.setAttribute("style", "align-items: center;height: 95px;")
    container.append(thumbnail2)

    let titlename = document.createElement("p");
    titlename.innerHTML = title
    titlename.setAttribute("style","margin-left: 10px;margin-top: 4px;position: relative;font-size: 13px;")
    thumbnail2.append(titlename)

    let channelname = document.createElement("p")
    channelname.innerHTML = channel
    channelname.setAttribute("style","margin-left: 10px;margin-top: 1px;position: fixed;color: grey;font-size: 10px;")
    thumbnail2.append(channelname)

    let views = document.createElement("p")
    views.innerHTML = ("• "+ view + " views")
    views.setAttribute("style","margin-left: 81px;margin-top: 1px;position: fixed;color: grey;font-size: 10px;")
    thumbnail2.append(views)


    let time = document.createElement("p")
    time.innerHTML = ("• "+times)
    time.setAttribute("style","margin-left: 140px;margin-top: 1px;position: fixed;color: grey;font-size: 10px;")
    thumbnail2.append(time)
}

createCard("NiggaShrestha", "https://i.ytimg.com/vi/tVzUXW6siu0/hqdefault.jpg?sqp=-oaymwEmCKgBEF5IWvKriqkDGQgBFQAAiEIYAdgBAeIBCggYEAIYBjgBQAE=&rs=AOn4CLB6VzxANxt3dHm91HW9lLfDlxvmuA","12:20","727k", "2 months ago", "Introduction to money" )



