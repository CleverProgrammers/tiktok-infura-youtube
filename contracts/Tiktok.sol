// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract Tiktok {
    struct Video {
        string caption;
        string url;
        uint256 likes;
        uint256 dislikes;
        address owner;
        address[] likedUsers;
    }

    // map through the likedUsers array
    mapping(address => mapping(uint256 => bool)) public likedUsers;
    mapping(uint256 => Video) public videos;
    // Store the number of likes for each video
    mapping(uint256 => uint256) public likes;
    uint256 public videoCount;

    event VideoCreated(
        uint256 id,
        string caption,
        string url,
        uint256 likes,
        uint256 dislikes,
        address owner
    );

    event VideoLiked(uint256 id, uint256 likes);
    event VideoDisliked(uint256 id, uint256 dislikes);

    function createVideo(string memory _caption, string memory _url) public {
        videoCount++;
        videos[videoCount] = Video(
            _caption,
            _url,
            0,
            0,
            msg.sender,
            new address[](0)
        );

        emit VideoCreated(videoCount, _caption, _url, 0, 0, msg.sender);
    }

    // Get the number of likes for a Video from mapping
    function getLikes(uint256 _id) public view returns (uint256) {
        return likes[_id];
    }




    function likeVideo(uint256 _id) public {
        Video storage _video = videos[_id];
        require(
            likedUsers[msg.sender][_id] == false,
            "You have already liked this video"
        );
        // Increment likes in mapping
        likes[_id] = likes[_id] + 1;
        // Add the user to the likedUsers array
        _video.likedUsers.push(msg.sender);

        //Set the user to true in the mapping
        likedUsers[msg.sender][_id] = true;
        videos[_id] = _video;
        emit VideoLiked(_id, _video.likes);
    }

    function dislikeVideo(uint256 _id) public {
        require(
            likedUsers[msg.sender][_id] == true,
            "You must like the video first"
        );
        Video storage _video = videos[_id];

        // Decrement likes in mapping
        likes[_id] = likes[_id] - 1;

        // Set the user to false in the likedUsers mapping
        likedUsers[msg.sender][_id] = false;

        videos[_id] = _video;
        emit VideoDisliked(_id, _video.dislikes);
    }

    function getVideoCount() public view returns (uint256) {
        return videoCount;
    }

    // Get all videos
    function getVideos() public view returns (Video[] memory) {
        Video[] memory _videos = new Video[](videoCount);
        for (uint256 i = 0; i < videoCount; i++) {
            _videos[i] = videos[i + 1];
        }
        return _videos;
    }
}
