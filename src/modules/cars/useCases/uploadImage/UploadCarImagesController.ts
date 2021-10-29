import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarImagesUseCase } from '@modules/cars/useCases/uploadImage/UploadCarImagesUseCase';

interface IFiles {
  filename: string;
}

class UploadCarImagesController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: car_id } = request.params;
    const images = request.files as IFiles[];

    const images_name = images.map(file => file.filename);

    const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase);

    await uploadCarImageUseCase.execute({
      car_id,
      images_name,
    });

    return response.status(201).send();
  }
}

export { UploadCarImagesController };
