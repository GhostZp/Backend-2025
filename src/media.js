const mediaItems = [
  {
    media_id: 9632,
    filename: '/images/ffd8.jpg',
    filesize: 887574,
    title: 'Favorite drink',
    description: '',
    user_id: 1606,
    media_type: 'image/jpeg',
    created_at: '2023-10-16T19:00:09.000Z',
  },
  {
    media_id: 9626,
    filename: '/images/dbbd.jpg',
    filesize: 60703,
    title: 'Miika',
    description: 'My Photo',
    user_id: 3671,
    media_type: 'image/jpeg',
    created_at: '2023-10-13T12:14:26.000Z',
  },
  {
    media_id: 9625,
    filename: '/images/2f9b.jpg',
    filesize: 30635,
    title: 'Aksux',
    description: 'friends',
    user_id: 260,
    media_type: 'image/jpeg',
    created_at: '2023-10-12T20:03:08.000Z',
  },
  {
    media_id: 9592,
    filename: '/images/f504.jpg',
    filesize: 48975,
    title: 'Desert',
    description: '',
    user_id: 3609,
    media_type: 'image/jpeg',
    created_at: '2023-10-12T06:59:05.000Z',
  },
  {
    media_id: 9590,
    filename: '/images/60ac.jpg',
    filesize: 23829,
    title: 'Basement',
    description: 'Light setup in basement',
    user_id: 305,
    media_type: 'image/jpeg',
    created_at: '2023-10-12T06:56:41.000Z',
  },
];

const getAllMedia = (req, res) => {
  res.json(mediaItems);
};

const getMediaByID = (req, res) => {
  const item = mediaItems.find(
    (item) => item.media_id === parseInt(req.params.id),
  );
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({message: 'media not found'});
  }
};

const postNewMediaItem = (req, res) => {
  const data = req.body;
  const requiredFields = ['filename', 'title', 'description', 'user_id', 'media_type'];
  const missingFields = requiredFields.filter(field => !data[field]);
  if (missingFields.length > 0) {
    return res.status(400).json({
      error: 'Missing required fields',
      missing: missingFields
    });
  }
  const newId = mediaItems.length > 0 ? mediaItems[mediaItems.length - 1].media_id + 1 : 1;
  data.media_id = newId;
  mediaItems.push(data);
  res.status(201).json({
    message: 'New item created',
    item: data
  });
};


const putMediaItem = (req, res) => {
  const mediaId = parseInt(req.params.id);
  const index = mediaItems.findIndex(item => item.media_id === mediaId);
  if (index === -1) {
    return res.sendStatus(404);
  }
  const { title, description } = req.body;
  if (!title && !description) {
    return res.status(400).json({ error: "title or description required" });
  }
  if (title) mediaItems[index].title = title;
  if (description) mediaItems[index].description = description;
  return res.json({ updated_media: mediaItems[index] });
};

const deleteMediaByID = (req, res) => {
  const itemToBeDeletedIndex = mediaItems.findIndex(
    (item) => item.media_id === parseInt(req.params.id),
  );
  if (itemToBeDeletedIndex != -1) {
    mediaItems.splice(itemToBeDeletedIndex, 1);
    res.status(200).json({message: 'item deleted'});
  } else {
    res.status(404).json({message: 'media item not found'});
  }
};

export {getAllMedia, getMediaByID, postNewMediaItem, putMediaItem, deleteMediaByID};