﻿using ByteShop.Application.UseCases.Commands.Product;
using ByteShop.Application.UseCases.Validations.Image;
using ByteShop.Exceptions;
using FluentValidation;

namespace ByteShop.Application.UseCases.Validations.Product;
public class UpdateProductValidation : AbstractValidator<UpdateProductCommand>
{
    private const int MAXIMUM_AMOUNT_OF_IMAGES = 5;

    public UpdateProductValidation(Domain.Entities.Product product)
	{
        RuleFor(x => x).SetValidator(new ProductValidation());
        RuleFor(x => x.SetMainImageBase64).SetValidator(new ImageBase64Validator());
        RuleForEach(x => x.AddSecondaryImageBase64).SetValidator(new ImageBase64Validator());

        When(x => x.AddSecondaryImageBase64?.Length > 0, () =>
        {
            RuleFor(x => x).Custom((command, context) =>
            {
                if (string.IsNullOrEmpty(product.MainImageUrl)
                    && command.SetMainImageBase64 is null)
                    context.AddFailure(ResourceErrorMessages.MUST_HAVE_A_MAIN_IMAGE);

                int total = GetTotalAmountOfImages(product, command);
                if (total > MAXIMUM_AMOUNT_OF_IMAGES)
                    context.AddFailure(ResourceErrorMessages.MAXIMUM_AMOUNT_OF_IMAGES);

            });
        });
    }

    private static int GetTotalAmountOfImages(Domain.Entities.Product product, UpdateProductCommand command)
    {
        var afterRemoved = product.GetImagesTotal() - command.GetTotalImagesToRemove();
        var final = afterRemoved + command.GetTotalImagesToAdd();
        return final;
    }
}
