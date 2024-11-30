import React from "react";
import "../../styles/Announcement.css";
import { formatDistanceToNow } from 'date-fns';
import { AiOutlineLink, AiOutlineClockCircle, AiOutlineUser } from "react-icons/ai";


interface AnnouncementProps {
  title: string;
  content: string;
  link?: string;
  image?: string;
  createdAt: Date;
  author: string;
}

const Announcement: React.FC<AnnouncementProps> = ({
  title,
  content,
  link,
  image,
  createdAt,
  author
}) => {
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return (
    <div className={`announcement ${link ? 'announcement-with-link' : ''}`}>
      <div className="announcement-header">
        <div className="announcement-author">
          <AiOutlineUser className="icon" />
          <span>{author}</span>
        </div>
        <div className="announcement-time">
          <AiOutlineClockCircle className="icon" />
          <span>{timeAgo}</span>
        </div>
      </div>

      <div className="announcement-body">
        <h3 className="announcement-title">{title}</h3>
        <p className="announcement-content">{content}</p>
        
        {image && (
          <div className="announcement-image">
            <img src={image} alt={title} />
          </div>
        )}
        
        {link && (
          <a href={link} className="announcement-link" target="_blank" rel="noopener noreferrer">
            <AiOutlineLink className="icon" />
            <span>View Resource</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default Announcement;
