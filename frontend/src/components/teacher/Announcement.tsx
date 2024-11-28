import React from "react";
import "../../styles/Announcement.css";
import { AiOutlineLink } from "react-icons/ai";

interface AnnouncementProps {
  title: string;
  content: string;
  link?: string;
  image?: ImageBitmap;
}

const Announcement: React.FC<AnnouncementProps> = ({
  title,
  content,
  link,
  image,
}) => {
  return (
    <>
      {link ? (
        <div className="anouncement">
          <div className="announcement-content">
            <div className="forum-post-header">
              <span className="forum-post-username">{title}</span>
              <span className="forum-post-date">{"20/03/2024"}</span>
            </div>
            <div className="announcement-header announcement-link">
              {content}
            </div>
          </div>
        </div>
      ) : (
        <div className="announcement">
          <div className="forum-post-header">
            <span className="forum-post-username">{title}</span>
            <span className="forum-post-date">{"20/03/2024"}</span>
          </div>
          <div className="announcement-content">
            <div className="announcement-header">{content}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Announcement;
