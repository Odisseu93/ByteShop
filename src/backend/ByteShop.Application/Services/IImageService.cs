﻿using ByteShop.Application.UseCases.Commands.Product;

namespace ByteShop.Application.Services;
public interface IImageService
{
    Task<string> UploadBase64ImageAsync(string base64Image, string extension);
    Task DeleteImageAsync(string[] removeSecondaryImageUrl);
    Task<bool> DeleteImageAsync(string imageUrl);
}
